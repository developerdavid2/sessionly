import { streamVideo } from "@/lib/stream-video";
import { NextRequest, NextResponse } from "next/server";
import {
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { db } from "@/db";
import { and, eq, not } from "drizzle-orm";
import { agents, meetings } from "@/db/schema";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
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

  const body = await req.text();

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
  console.log("📩 Event type:", eventType);

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call?.custom?.meetingId;

    console.log("🚀 Call session started for meeting:", meetingId);

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting ID in call custom data" },
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

    console.log(
      "✅ Meeting found:",
      existingMeeting.id,
      "Status:",
      existingMeeting.status,
    );

    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, existingMeeting.id));

    console.log("✅ Meeting status updated to active");

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      console.error("❌ Agent not found:", existingMeeting.agentId);
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    console.log("✅ Agent found:", {
      agentId: existingAgent.id,
      userId: existingAgent.userId,
      name: existingAgent.name,
    });

    const call = streamVideo.video.call("default", meetingId);

    try {
      console.log("🤖 Connecting OpenAI agent to call...");

      const realtimeClient = await streamVideo.video.connectOpenAi({
        call,
        openAiApiKey: process.env.OPENAI_API_KEY!,
        agentUserId: existingAgent.id,
      });

      console.log("✅ OpenAI client connected");

      realtimeClient.updateSession({
        instructions: existingAgent.instructions,
      });

      console.log("✅ Agent session updated with instructions");
      console.log(
        `✅ OpenAI agent ${existingAgent.userId} successfully connected to call ${meetingId}`,
      );
    } catch (error) {
      console.error("❌ Failed to connect OpenAI agent:", error);
      return NextResponse.json(
        { error: "Failed to connect agent to call" },
        { status: 500 },
      );
    }
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
  }

  return NextResponse.json({ status: "ok" });
}
