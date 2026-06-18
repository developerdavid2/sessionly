import { streamVideo } from "@/lib/stream-video";
import { NextRequest, NextResponse } from "next/server";
import zlib from "zlib";
import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
  MessageNewEvent,
} from "@stream-io/node-sdk";
import { db } from "@/db";
import { and, eq, not } from "drizzle-orm";
import { agents, meetings } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { OpenAI } from "openai";
import { streamChat } from "@/lib/stream-chat";

import { generateAvatarUri } from "@/lib/avatar";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

/**
 * Stream gzip-compresses webhook payloads (Content-Encoding: gzip) — this
 * is the default for apps created after May 7, 2026, but can also be
 * toggled on for older apps. The HMAC signature is computed over the
 * DECOMPRESSED body, so reading the raw text via req.text() and verifying
 * directly against it always fails once compression is on: req.text()
 * decodes the raw gzip bytes as UTF-8, producing garbage that can never
 * match the signature Stream computed over the original JSON. This was
 * the root cause of every persistent "Invalid signature" 401 in this app,
 * not a timing or replay issue.
 *
 * Fix: read the raw bytes, detect the gzip magic number (0x1f 0x8b), and
 * gunzip before verifying/parsing. Uncompressed bodies pass through
 * unchanged, so this works whether or not compression is enabled.
 */
function decodeWebhookBody(buffer: Buffer): string {
  const isGzipped =
    buffer.length > 2 && buffer[0] === 0x1f && buffer[1] === 0x8b;
  const raw = isGzipped ? zlib.gunzipSync(buffer) : buffer;
  return raw.toString("utf-8");
}

/**
 * Stream sometimes sends `call.custom` as null/empty depending on how the
 * call was created. Every event payload also carries `call_cid` in the
 * shape "default:<callId>", and the callId IS the meetingId in this app.
 * Prefer the explicit custom field, but fall back to parsing call_cid so a
 * missing custom field doesn't hard-fail the whole event.
 */
function resolveMeetingId(
  customMeetingId: unknown,
  callCid: string | undefined | null,
): string | undefined {
  if (typeof customMeetingId === "string" && customMeetingId.length > 0) {
    return customMeetingId;
  }
  return callCid?.split(":")[1];
}

export async function GET(req: NextRequest) {
  const meetingId = req.nextUrl.searchParams.get("meetingId");

  if (!meetingId) {
    return NextResponse.json({
      status: "active",
      message: "Webhook is running",
      timestamp: new Date().toISOString(),
      endpoints: {
        healthCheck: "GET /api/webhook",
        meetingStatus: "GET /api/webhook?meetingId=YOUR_MEETING_ID",
        webhook: "POST /api/webhook (used by Stream)",
      },
    });
  }

  try {
    const call = streamVideo.video.call("default", meetingId);
    const callData = await call.get();
    const [meeting] = await db
      .select()
      .from(meetings)
      .where(eq(meetings.id, meetingId));

    const { members } = await call.queryMembers({});

    return NextResponse.json({
      meetingId,
      callExists: !!callData,
      callState: callData.call,
      meetingStatus: meeting?.status,
      participants: members.map((m) => ({
        userId: m.user_id,
        role: m.role,
        createdAt: m.created_at,
      })),
      totalParticipants: members.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching call status:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch call status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Missing signature or API key" },
      { status: 400 },
    );
  }

  const rawBuffer = Buffer.from(await req.arrayBuffer());
  const body = decodeWebhookBody(rawBuffer);

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = resolveMeetingId(
      event.call?.custom?.meetingId,
      event.call_cid,
    );

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting ID in call custom data or call_cid" },
        { status: 400 },
      );
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "processing")),
        ),
      );

    if (!existingMeeting) {
      return NextResponse.json(
        { error: "Meeting not found or already completed/cancelled" },
        { status: 404 },
      );
    }

    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Connecting the realtime OpenAI agent can be slow (cold handshake,
    // network variance). Doing this inline blocked the webhook response and
    // was the cause of Stream's "context deadline exceeded" timeouts. We now
    // ack the webhook immediately and hand the connection off to a
    // background Inngest function instead.
    await inngest.send({
      name: "meetings/agent.connect",
      data: {
        meetingId,
        agentId: existingAgent.id,
        agentInstructions: existingAgent.instructions,
      },
    });
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid?.split(":")[1];

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting ID in call CID" },
        { status: 400 },
      );
    }

    const call = streamVideo.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = resolveMeetingId(
      event.call?.custom?.meetingId,
      event.call_cid,
    );

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting ID in call custom data or call_cid" },
        { status: 400 },
      );
    }

    await db
      .update(meetings)
      .set({ status: "processing", endedAt: new Date() })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
  } else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json(
        { error: "Meeting not found to update transcript URL" },
        { status: 404 },
      );
    }

    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });
  } else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId));
  } else if (eventType === "message.new") {
    const event = payload as MessageNewEvent;

    const userId = event.user?.id;
    const channelId = event.channel_id;
    const text = event.message?.text;

    if (!userId || !channelId || !text) {
      return NextResponse.json(
        { error: "Missing user ID, channel ID, or message text" },
        { status: 400 },
      );
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, channelId), eq(meetings.status, "completed")));

    if (!existingMeeting) {
      return NextResponse.json(
        { error: "Meeting not found or not completed" },
        { status: 404 },
      );
    }

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (userId === existingAgent.id) {
      const instructions = `
      You are an AI assistant helping the user revisit a recently completed meeting.
      Below is a summary of the meeting, generated from the transcript:
      
      ${existingMeeting.summary}
      
      The following are your original instructions from the live meeting assistant. Please continue to follow these behavioral guidelines as you assist the user:
      
      ${existingAgent.instructions}
      
      The user may ask questions about the meeting, request clarifications, or ask for follow-up actions.
      Always base your responses on the meeting summary above.
      
      You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      
      If the summary does not contain enough information to answer a question, politely let the user know.
      
      Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.
      `;

      const channel = streamChat.channel("messaging", channelId);
      await channel.watch();

      const previousMesages = channel.state.messages
        .slice(-5)
        .filter((msg) => msg.text && msg.text.trim() !== "")
        .map<ChatCompletionMessageParam>((message) => ({
          role: message.user?.id === existingAgent.id ? "assistant" : "user",
          content: message.text || "",
        }));

      const GPTResponse = await openaiClient.chat.completions.create({
        messages: [
          { role: "system", content: instructions },
          ...previousMesages,
          { role: "user", content: text },
        ],
        model: "gpt-4o",
      });

      const GPTResponseText = GPTResponse.choices[0]?.message?.content;

      if (!GPTResponseText) {
        return NextResponse.json({ error: "No response from GPT" });
      }

      const avatarUrl = generateAvatarUri({
        seed: existingAgent.name,
        variant: "botttsNeutral",
      });

      await streamChat.upsertUsers([
        {
          id: existingAgent.id,
          name: existingAgent.name,
          image: avatarUrl,
        },
      ]);

      await channel.sendMessage({
        text: GPTResponseText,
        user: {
          id: existingAgent.id,
          name: existingAgent.name,
          image: avatarUrl,
        },
      });
    }
  }
  return NextResponse.json({ status: "ok" });
}
