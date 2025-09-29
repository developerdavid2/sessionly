import React, { useState } from "react";
import ResponsiveDialog from "@/components/responsive-dialog";
import AgentsForm from "@/modules/agents/ui/components/agents-form";
import { AgentGetOne } from "@/modules/agents/types";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleOpenChange = (updateOpen: boolean) => {
    // Prevent closing if form is submitting
    if (!isPending) {
      onOpenChange(updateOpen);
    }
  };

  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <AgentsForm
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

export default UpdateAgentDialog;
