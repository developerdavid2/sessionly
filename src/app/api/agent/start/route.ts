// src/app/api/agent/start/route.ts
import { NextRequest, NextResponse } from "next/server";
import { startGeminiRealtime } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const { meetingId, agentId } = await req.json();

  if (!meetingId || !agentId) {
    return NextResponse.json(
      { error: "Missing meetingId or agentId" },
      { status: 400 },
    );
  }

  try {
    await startGeminiRealtime(meetingId, agentId);
    return NextResponse.json({ ok: true, meetingId, agentId });
  } catch (err: any) {
    console.error("Agent start failed:", err);
    return NextResponse.json(
      { error: err.message || "Failed to start agent" },
      { status: 500 },
    );
  }
}
