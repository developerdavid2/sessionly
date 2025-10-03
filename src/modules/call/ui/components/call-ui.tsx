"use client";

import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "@/modules/call/ui/components/call-lobby";
import { CallActive } from "@/modules/call/ui/components/call-active";
import { CallEnded } from "@/modules/call/ui/components/call-ended";

interface Props {
  meetingName: string;
}
export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    try {
      // Ensure call exists before joining
      await call.getOrCreate();
      await call.join();
      setShow("call");
    } catch (error) {
      console.error("Failed to join call:", error);
      // Handle error (show message to user, etc.)
    }
  };

  const handleLeave = () => {
    if (!call) return;
    call.leave();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
