import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { LoaderIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  meetingId: string;
}

export const UpcomingState = ({ meetingId }: Props) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleStartMeeting = () => {
    setIsStarting(true);
    // Navigation will happen via the Link, state persists during transition
  };

  return (
    <div className="bg-background rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Not started yet"
        description="Once you start this meeting, it will appear here."
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          asChild={!isStarting}
          className="w-full lg:w-auto"
          disabled={isStarting}
          onClick={isStarting ? undefined : handleStartMeeting}
        >
          {isStarting ? (
            <>
              <LoaderIcon className="animate-spin" />
              Starting...
            </>
          ) : (
            <Link href={`/call/${meetingId}`}>
              <VideoIcon />
              Start Meeting
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
};
