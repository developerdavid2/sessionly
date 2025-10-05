// In your vapi-agent.tsx - Fix the connection logic
import React, { useEffect, useRef, useState } from "react";
import { useCall, StreamVideoClient } from "@stream-io/video-react-sdk";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff } from "lucide-react";

export function VapiAgent() {
  const call = useCall();
  const vapiRef = useRef<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [agentStatus, setAgentStatus] = useState<
    "waiting" | "listening" | "speaking"
  >("waiting");
  const [agentName, setAgentName] = useState("Agent");

  useEffect(() => {
    if (!call) return;

    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error("NEXT_PUBLIC_VAPI_PUBLIC_KEY not set");
      return;
    }

    vapiRef.current = new Vapi(publicKey);

    // Vapi event listeners
    vapiRef.current.on("call-start", () => {
      console.log("✅ Vapi call started");
      setIsConnected(true);
      setAgentStatus("listening");
    });

    vapiRef.current.on("call-end", () => {
      console.log("📞 Vapi call ended");
      setIsConnected(false);
      setAgentStatus("waiting");
    });

    vapiRef.current.on("speech-start", () => {
      setAgentStatus("listening");
    });

    vapiRef.current.on("speech-end", () => {
      setAgentStatus("waiting");
    });

    vapiRef.current.on("message", (message: any) => {
      if (message.type === "transcript" && message.role === "assistant") {
        setAgentStatus("speaking");
        // Reset to listening after a delay
        setTimeout(() => setAgentStatus("listening"), 2000);
      }
    });

    vapiRef.current.on("error", (error: any) => {
      console.error("❌ Vapi error:", error);
    });

    vapiRef.current.on("volume-level", (volume: number) => {
      if (volume > 0.1) {
        setAgentStatus("speaking");
      }
    });

    // Listen for backend webhook event
    // In vapi-agent.tsx - Update the event handler
    const handleCustomEvent = async (event: any) => {
      if (event.type === "vapi.agent.ready") {
        console.log("🎯 Agent ready event received:", event);

        // The custom data is now in event.custom, not event.custom.custom
        const customData = event.custom || {};
        setAgentName(customData.agentName || "Agent");

        const { vapiAssistantId } = customData;

        if (!vapiAssistantId) {
          console.error("❌ No Vapi assistant ID found");
          return;
        }

        console.log("🤖 Starting Vapi with assistant:", vapiAssistantId);

        // Start Vapi for voice
        try {
          await vapiRef.current?.start(vapiAssistantId);
          console.log("✅ Started Vapi with assistant:", vapiAssistantId);
        } catch (err) {
          console.error("❌ Failed to start Vapi:", err);
        }
      }
    };
    call.on("custom", handleCustomEvent);

    return () => {
      call.off("custom", handleCustomEvent);
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [call]);

  const toggleMute = () => {
    if (vapiRef.current) {
      vapiRef.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  if (!isConnected && agentStatus === "waiting") {
    return (
      <div className="fixed bottom-24 right-6 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-sm">Connecting {agentName}...</span>
        </div>
      </div>
    );
  }

  if (!isConnected) return null;

  return (
    <div className="fixed bottom-24 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full transition-colors ${
              agentStatus === "speaking"
                ? "bg-green-400 animate-pulse"
                : agentStatus === "listening"
                  ? "bg-blue-300 animate-pulse"
                  : "bg-gray-400"
            }`}
          />
          <div>
            <div className="font-semibold text-sm">{agentName}</div>
            <div className="text-xs opacity-75">
              {agentStatus === "speaking"
                ? "Speaking..."
                : agentStatus === "listening"
                  ? "Listening..."
                  : "Ready"}
            </div>
          </div>
        </div>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      </div>
    </div>
  );
}
