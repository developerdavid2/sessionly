import React, { useState } from "react";
import ResponsiveDialog from "@/components/responsive-dialog";
import MeetingsForm from "@/modules/meetings/ui/components/meetings-form";
import { MeetingGetOne } from "@/modules/meetings/types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleOpenChange = (updateOpen: boolean) => {
    // Prevent closing if form is submitting
    if (!isPending) {
      onOpenChange(updateOpen);
    }
  };

  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <MeetingsForm
        onSuccess={() => {
          setIsPending(false);
          onOpenChange(false);
        }}
        onCancel={() => {
          if (!isPending) {
            onOpenChange(false);
          }
        }}
        onPendingChange={setIsPending}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
