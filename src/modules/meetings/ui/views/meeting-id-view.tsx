"use client";

import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import MeetingDetailSkeleton from "@/modules/meetings/ui/views/meeting-id-loading-state";
import MeetingDetailError from "@/modules/meetings/ui/views/meeting-id-error-state";
import MeetingIdViewHeader from "@/modules/meetings/ui/components/meeting-id-view-header";
import { DeleteMeetingDialog } from "@/modules/meetings/ui/components/delete-meeting-dialog";
import { UpdateMeetingDialog } from "@/modules/meetings/ui/components/update-meeting-dialog";
import { UpcomingState } from "@/modules/meetings/ui/components/upcoming-state";
import { ActiveState } from "@/modules/meetings/ui/components/active-state";
import { CancelledState } from "@/modules/meetings/ui/components/cancelled-state";
import { ProcessingState } from "@/modules/meetings/ui/components/processing-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const isUpcoming = data.status === "upcoming";
  const isActive = data.status === "active";
  const isProcessing = data.status === "processing";
  const isCompleted = data.status === "completed";
  const isCancelled = data.status === "cancelled";

  return (
    <>
      <DeleteMeetingDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        initialValues={data}
      />
      <UpdateMeetingDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setIsUpdateDialogOpen(true)}
          onRemove={() => setIsDeleteDialogOpen(true)}
        />

        <div className="bg-background rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            {isUpcoming && (
              <UpcomingState
                meetingId={meetingId}
                onCancelMeeting={() => {}}
                isCancelling={false}
              />
            )}
            {isActive && <ActiveState meetingId={meetingId} />}
            {isProcessing && <ProcessingState />}
            {isCompleted && <div>Completed</div>}
            {isCancelled && <CancelledState />}
          </div>
        </div>
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return <MeetingDetailSkeleton />;
};

export const MeetingIdViewError = () => {
  return <MeetingDetailError />;
};
