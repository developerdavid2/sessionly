// src/app/api/webhook/route.ts
// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { streamVideo } from "@/lib/stream-video";
import {
  CallSessionStartedEvent,
  CallSessionParticipantLeftEvent,
} from "@stream-io/node-sdk";
import { db } from "@/db";
import { and, eq, not } from "drizzle-orm";
import { meetings, agents } from "@/db/schema";
import {
  startGeminiRealtime,
  sendTranscriptToGemini,
  closeGeminiSession,
} from "@/lib/gemini";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const body = await req.text();

  if (!signature || !verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = payload?.type;
  console.log("📩 Event type:", eventType);

  // Handle call session started
  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call?.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }

    // Lookup meeting & agent
    const [meeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "cancelled")),
        ),
      );

    if (!meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    const [agent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, meeting.agentId));

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    console.log("🚀 Meeting active:", meeting.id, "Agent:", agent.name);

    // Update meeting status
    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, meeting.id));

    // Start Gemini session directly (no internal fetch)
    try {
      await startGeminiRealtime(meetingId, agent.id);
      console.log("✅ Gemini agent started for meeting:", meetingId);
    } catch (err) {
      console.error("❌ Error starting Gemini agent:", err);
      return NextResponse.json(
        { error: "Failed to start Gemini agent" },
        { status: 500 },
      );
    }

    // Add agent as participant to the Stream call
    try {
      const call = streamVideo.video.call("default", meetingId);

      // Check if agent is already in the call
      const { members } = await call.queryMembers({});
      const agentInCall = members.find((m) => m.user_id === agent.id);

      if (!agentInCall) {
        await call.updateCallMembers({
          update_members: [
            {
              user_id: agent.id,
              role: "user",
            },
          ],
        });
        console.log(`✅ Added agent ${agent.id} to call ${meetingId}`);
      }
    } catch (err) {
      console.error("❌ Error adding agent to call:", err);
    }
  }

  // Handle transcription received
  if (eventType === "call.transcription.received") {
    const meetingId = payload.call_cid?.split(":")[1];
    const transcriptText = payload.text;
    const userId = payload.user?.id;

    if (meetingId && transcriptText) {
      // Don't send agent's own speech back to itself
      const [meeting] = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId));

      if (meeting && userId !== meeting.agentId) {
        console.log(`📝 Transcript from user ${userId}: "${transcriptText}"`);
        await sendTranscriptToGemini(meetingId, transcriptText);
      }
    }
  }

  // Handle participant left
  if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid?.split(":")[1];

    if (meetingId) {
      try {
        // Close Gemini session
        closeGeminiSession(meetingId);

        // End the call
        const call = streamVideo.video.call("default", meetingId);
        await call.end();

        // Update meeting status
        await db
          .update(meetings)
          .set({ status: "completed", endedAt: new Date() })
          .where(eq(meetings.id, meetingId));

        console.log(`✅ Meeting ${meetingId} ended and cleaned up`);
      } catch (err) {
        console.error("❌ Error ending call:", err);
      }
    }
  }

  return NextResponse.json({ status: "ok" });
}
// import { streamVideo } from "@/lib/stream-video";

// import { NextRequest, NextResponse } from "next/server";
// import {
//   CallSessionParticipantLeftEvent,
//   CallSessionStartedEvent,
// } from "@stream-io/node-sdk";
// import { db } from "@/db";
// import { and, eq, not } from "drizzle-orm";
// import { agents, meetings } from "@/db/schema";
//
// function verifySignatureWithSDK(body: string, signature: string): boolean {
//   return streamVideo.verifyWebhook(body, signature);
// }
//
// // GET endpoint - Health check or meeting status
// export async function GET(req: NextRequest) {
//   const meetingId = req.nextUrl.searchParams.get("meetingId");
//
//   // If no meetingId, return health check
//   if (!meetingId) {
//     return NextResponse.json({
//       status: "active",
//       message: "Webhook is running",
//       timestamp: new Date().toISOString(),
//       endpoints: {
//         healthCheck: "GET /api/webhook",
//         meetingStatus: "GET /api/webhook?meetingId=YOUR_MEETING_ID",
//         webhook: "POST /api/webhook (used by Stream)",
//       },
//     });
//   }
//
//   // If meetingId provided, return meeting status
//   try {
//     const call = streamVideo.video.call("default", meetingId);
//     const callData = await call.get();
//
//     const [meeting] = await db
//       .select()
//       .from(meetings)
//       .where(eq(meetings.id, meetingId));
//
//     const { members } = await call.queryMembers({});
//
//     return NextResponse.json({
//       meetingId,
//       callExists: !!callData,
//       callState: callData.call,
//       meetingStatus: meeting?.status,
//       participants: members.map((m) => ({
//         userId: m.user_id,
//         role: m.role,
//         createdAt: m.created_at,
//       })),
//       totalParticipants: members.length,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("Error fetching call status:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to fetch call status",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     );
//   }
// }
//
// export async function POST(req: NextRequest) {
//   const signature = req.headers.get("x-signature");
//   const apiKey = req.headers.get("x-api-key");
//
//   if (!signature || !apiKey) {
//     return NextResponse.json(
//       {
//         error: "Missing signature or API key",
//       },
//       { status: 400 },
//     );
//   }
//
//   const body = await req.text();
//
//   if (!verifySignatureWithSDK(body, signature)) {
//     return NextResponse.json(
//       {
//         error: "Invalid signature",
//       },
//       { status: 401 },
//     );
//   }
//
//   let payload: unknown;
//   try {
//     payload = JSON.parse(body) as Record<string, unknown>;
//   } catch {
//     return NextResponse.json(
//       { error: "Invalid JSON payload" },
//       { status: 400 },
//     );
//   }
//
//   const eventType = (payload as Record<string, unknown>)?.type;
//   console.log("📩 Event type:", eventType);
//
//   if (eventType === "call.session_started") {
//     const event = payload as CallSessionStartedEvent;
//     const meetingId = event.call?.custom?.meetingId;
//
//     console.log("🚀 Call session started for meeting:", meetingId);
//
//     if (!meetingId) {
//       return NextResponse.json(
//         { error: "Missing meeting ID in call custom data" },
//         { status: 400 },
//       );
//     }
//
//     const [existingMeeting] = await db
//       .select()
//       .from(meetings)
//       .where(
//         and(
//           eq(meetings.id, meetingId),
//           not(eq(meetings.status, "completed")),
//           not(eq(meetings.status, "cancelled")),
//         ),
//       );
//
//     if (!existingMeeting) {
//       return NextResponse.json(
//         { error: "Meeting not found or already completed/cancelled" },
//         { status: 404 },
//       );
//     }
//
//     console.log(
//       "✅ Meeting found:",
//       existingMeeting.id,
//       "Status:",
//       existingMeeting.status,
//     );
//
//     await db
//       .update(meetings)
//       .set({ status: "active", startedAt: new Date() })
//       .where(eq(meetings.id, existingMeeting.id));
//
//     console.log("✅ Meeting status updated to active");
//
//     const [existingAgent] = await db
//       .select()
//       .from(agents)
//       .where(eq(agents.id, existingMeeting.agentId));
//
//     if (!existingAgent) {
//       console.error("❌ Agent not found:", existingMeeting.agentId);
//       return NextResponse.json({ error: "Agent not found" }, { status: 404 });
//     }
//
//     console.log("✅ Agent found:", {
//       agentId: existingAgent.id,
//       userId: existingAgent.userId,
//       name: existingAgent.name,
//     });
//
//     const call = streamVideo.video.call("default", meetingId);
//
//     try {
//       console.log("🤖 Connecting OpenAI agent to call...");
//
//       const { members } = await call.queryMembers({});
//       if (!members.find((m) => m.user_id === existingAgent.id)) {
//         const realtimeClient = await streamVideo.video.connectOpenAi({
//           call,
//           openAiApiKey: process.env.OPENAI_API_KEY!,
//           agentUserId: existingAgent.id,
//         });
//
//         console.log("✅ OpenAI client connected");
//
//         realtimeClient.updateSession({
//           instructions:
//             "You are Mira, an AI assistant. Respond briefly when someone speaks.",
//         });
//       }
//
//       console.log("✅ Agent session updated with instructions");
//
//       console.log(
//         `✅ OpenAI agent ${existingAgent.userId} successfully connected to call ${meetingId}`,
//       );
//     } catch (error) {
//       console.error("❌ Failed to connect OpenAI agent:", error);
//       return NextResponse.json(
//         {
//           error: "Failed to connect agent to call",
//         },
//         { status: 500 },
//       );
//     }
//   } else if (eventType === "call.session_participant_left") {
//     const event = payload as CallSessionParticipantLeftEvent;
//     const meetingId = event.call_cid?.split(":")[1];
//
//     if (!meetingId) {
//       return NextResponse.json(
//         { error: "Missing meeting ID in call CID" },
//         { status: 400 },
//       );
//     }
//
//     const call = streamVideo.video.call("default", meetingId);
//     await call.end();
//   }
//
//   return NextResponse.json({ status: "ok" });
// }
