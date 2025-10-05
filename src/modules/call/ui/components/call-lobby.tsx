import React, { useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogInIcon, Loader2 } from "lucide-react";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      Please grant your browser permissions to access your camera and
      microphone.
    </p>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const [isJoining, setIsJoining] = useState(false);

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermissions = hasMicPermission && hasCameraPermission;

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      await onJoin();
    } catch (error) {
      console.error("Failed to join:", error);
      setIsJoining(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to Join?</h6>
            <p className="text-sm">Set up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermissions
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex gap-x-2 justify-between w-full">
            <Button asChild variant="ghost" disabled={isJoining}>
              <Link href="/meetings" aria-disabled={isJoining}>
                Cancel
              </Link>
            </Button>
            <Button onClick={handleJoin} disabled={isJoining}>
              {isJoining ? (
                <>
                  <Loader2 className="animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <LogInIcon />
                  Join Call
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
