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

    const call = streamVideo.video.call("default", meetingId);

    try {
      const realtimeClient = await streamVideo.video.connectOpenAi({
        call,
        openAiApiKey: process.env.OPENAI_API_KEY!,
        agentUserId: existingAgent.id,
      });

      realtimeClient.updateSession({
        instructions: existingAgent.instructions,
      });
    } catch (error) {
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
