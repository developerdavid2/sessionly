// src/lib/gemini.ts
import WebSocket from "ws";
import { streamVideo } from "@/lib/stream-video";

interface GeminiMessage {
  setupComplete?: boolean;
  serverContent?: {
    modelTurn?: {
      parts: Array<{
        inlineData?: {
          mimeType: string;
          data: string;
        };
        text?: string;
      }>;
    };
    turnComplete?: boolean;
    interrupted?: boolean;
    generationComplete?: boolean;
  };
}

interface GeminiSession {
  ws: WebSocket;
  meetingId: string;
  agentId: string;
  audioQueue: Buffer[];
  isReady: boolean;
}

const geminiSessions: Record<string, GeminiSession> = {};

/**
 * Start a Gemini Live session using raw WebSocket
 */
export async function startGeminiRealtime(
  meetingId: string,
  agentId: string,
): Promise<GeminiSession> {
  if (geminiSessions[meetingId]) {
    console.log(`♻️ Reusing existing Gemini session for ${meetingId}`);
    return geminiSessions[meetingId];
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  // Correct WebSocket URL from official docs
  const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`;

  console.log(`🚀 Connecting to Gemini Live API for meeting ${meetingId}...`);

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);

    const session: GeminiSession = {
      ws,
      meetingId,
      agentId,
      audioQueue: [],
      isReady: false,
    };

    let setupTimeout = setTimeout(() => {
      ws.close();
      reject(new Error("Gemini setup timeout"));
    }, 15000); // Increased to 15s

    ws.on("open", () => {
      console.log(`✅ WebSocket connected for meeting ${meetingId}`);

      // Send setup message with correct structure from API docs
      const setupMessage = {
        setup: {
          model: "models/gemini-2.0-flash-exp",
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Puck",
                },
              },
            },
          },
          systemInstruction: {
            parts: [
              {
                text: "You are Mira, a helpful and friendly AI assistant. Keep your responses brief and conversational, as if talking naturally to someone. Respond in a warm, approachable tone.",
              },
            ],
          },
        },
      };

      ws.send(JSON.stringify(setupMessage));
      console.log(`📤 Sent setup message for ${meetingId}`);
    });

    ws.on("message", async (data: WebSocket.Data) => {
      try {
        const message: GeminiMessage = JSON.parse(data.toString());

        // Handle setup complete
        if (message.setupComplete) {
          console.log(`✅ Gemini setup complete for ${meetingId}`);
          session.isReady = true;
          clearTimeout(setupTimeout);
          geminiSessions[meetingId] = session;
          resolve(session);
        }

        // Handle server content (responses)
        if (message.serverContent?.modelTurn?.parts) {
          for (const part of message.serverContent.modelTurn.parts) {
            // Handle audio response
            if (part.inlineData?.mimeType?.startsWith("audio/")) {
              console.log(`🎵 Received audio chunk for ${meetingId}`);
              const audioBuffer = Buffer.from(part.inlineData.data, "base64");
              session.audioQueue.push(audioBuffer);

              // Inject audio into call
              await injectAudioIntoCall(meetingId, audioBuffer, agentId);
            }

            // Handle text response (for debugging)
            if (part.text) {
              console.log(`💬 Gemini text response: ${part.text}`);
            }
          }
        }

        // Handle turn complete
        if (message.serverContent?.turnComplete) {
          console.log(`✅ Turn complete for ${meetingId}`);
        }

        // Handle interruption
        if (message.serverContent?.interrupted) {
          console.log(`⚠️ Response interrupted for ${meetingId}`);
        }
      } catch (error) {
        console.error(`❌ Error parsing Gemini message:`, error);
      }
    });

    ws.on("error", (error) => {
      console.error(`❌ WebSocket error for ${meetingId}:`, error.message);
      clearTimeout(setupTimeout);
      delete geminiSessions[meetingId];
      reject(error);
    });

    ws.on("close", (code, reason) => {
      console.log(
        `🔒 Gemini WebSocket closed for ${meetingId}: ${code} - ${reason.toString()}`,
      );
      clearTimeout(setupTimeout);
      delete geminiSessions[meetingId];
    });
  });
}

/**
 * Send text transcript to Gemini using correct API format
 */
export async function sendTranscriptToGemini(
  meetingId: string,
  transcriptText: string,
) {
  const session = geminiSessions[meetingId];

  if (!session) {
    console.warn(`⚠️ No active Gemini session for ${meetingId}`);
    return;
  }

  if (!session.isReady) {
    console.warn(`⚠️ Gemini session not ready for ${meetingId}`);
    return;
  }

  console.log(`➡️ Sending transcript to Gemini: "${transcriptText}"`);

  try {
    // Use realtimeInput for streaming text input
    const message = {
      realtimeInput: {
        text: transcriptText,
      },
    };

    session.ws.send(JSON.stringify(message));
  } catch (error) {
    console.error(`❌ Failed to send transcript to Gemini:`, error);
  }
}

/**
 * Send audio to Gemini using correct API format
 */
export async function sendAudioToGemini(
  meetingId: string,
  audioBuffer: Buffer,
  mimeType: string = "audio/pcm;rate=16000",
) {
  const session = geminiSessions[meetingId];

  if (!session || !session.isReady) {
    console.warn(`⚠️ No ready Gemini session for ${meetingId}`);
    return;
  }

  try {
    const base64Audio = audioBuffer.toString("base64");

    const message = {
      realtimeInput: {
        mediaChunks: [
          {
            mimeType: mimeType,
            data: base64Audio,
          },
        ],
      },
    };

    session.ws.send(JSON.stringify(message));
    console.log(`🎤 Sent audio chunk to Gemini (${audioBuffer.length} bytes)`);
  } catch (error) {
    console.error(`❌ Failed to send audio to Gemini:`, error);
  }
}

/**
 * Inject Gemini's audio response into the Stream call
 */
async function injectAudioIntoCall(
  meetingId: string,
  audioBuffer: Buffer,
  agentId: string,
) {
  try {
    const call = streamVideo.video.call("default", meetingId);

    console.log(
      `🔊 Ready to inject audio into call ${meetingId} (${audioBuffer.length} bytes)`,
    );

    // TEMPORARY: Save audio to file for debugging
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs");
      const path = `/tmp/gemini-audio-${meetingId}-${Date.now()}.raw`;
      fs.writeFileSync(path, audioBuffer);
      console.log(`💾 Saved audio to ${path}`);
    }

    // Send custom event to notify clients
    try {
      await call.sendCustomEvent({
        type: "gemini.audio.response",
        user: { id: agentId },
        custom: {
          audioData: audioBuffer.toString("base64"),
          timestamp: Date.now(),
        },
      });
      console.log(`📡 Sent custom audio event to call participants`);
    } catch (err) {
      console.error(`❌ Failed to send custom event:`, err);
    }
  } catch (error) {
    console.error(`❌ Failed to inject audio into call ${meetingId}:`, error);
  }
}

/**
 * Close a Gemini session
 */
export function closeGeminiSession(meetingId: string) {
  const session = geminiSessions[meetingId];

  if (session) {
    try {
      session.ws.close(1000, "Meeting ended");
      delete geminiSessions[meetingId];
      console.log(`✅ Closed Gemini session for ${meetingId}`);
    } catch (error) {
      console.error(`❌ Error closing Gemini session for ${meetingId}:`, error);
    }
  }
}

/**
 * Get session status (for debugging)
 */
export function getSessionStatus(meetingId: string) {
  const session = geminiSessions[meetingId];
  return {
    exists: !!session,
    isReady: session?.isReady || false,
    wsState: session?.ws.readyState,
    audioQueueLength: session?.audioQueue.length || 0,
  };
}
