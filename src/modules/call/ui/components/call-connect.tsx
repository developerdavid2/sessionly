"use client";

import React, { useEffect, useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { CallUI } from "@/modules/call/ui/components/call-ui";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}
export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions(),
  );

  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    const initializeCall = async () => {
      const _client = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
        user: {
          id: userId,
          name: userName,
          image: userImage,
        },
        tokenProvider: generateToken,
      });

      setClient(_client);

      // Create the call
      const _call = _client.call("default", meetingId);

      try {
        // Ensure the call exists on Stream servers
        await _call.getOrCreate();

        _call.camera.disable();
        _call.microphone.disable();
        setCall(_call);
      } catch (error) {
        console.error("Failed to create call:", error);
      }
    };

    initializeCall();

    return () => {
      if (call?.state.callingState !== CallingState.LEFT) {
        call?.leave();
        call?.endCall();
      }
      client?.disconnectUser();
    };
  }, [userId, userName, userImage, generateToken, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
