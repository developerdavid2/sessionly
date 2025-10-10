import React, { useState } from "react";
import ResponsiveDialog from "@/components/responsive-dialog";
import MeetingsForm from "@/modules/meetings/ui/components/meetings-form";
import { useRouter } from "next/navigation";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewMeetingDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleOpenChange = (newOpen: boolean) => {
    // Prevent closing if form is submitting
    if (!isPending) {
      onOpenChange(newOpen);
    }
  };

  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new meeting"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <MeetingsForm
        onSuccess={(id) => {
          setIsPending(false);
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => {
          if (!isPending) {
            onOpenChange(false);
          }
        }}
        onPendingChange={setIsPending}
      />
    </ResponsiveDialog>
  );
};

export default NewMeetingDialog;
