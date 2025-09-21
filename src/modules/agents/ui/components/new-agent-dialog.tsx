import React from "react";
import ResponsiveDialog from "@/components/responsive-dialog";
import AgentsForm from "@/modules/agents/ui/components/agents-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
export default NewAgentDialog;
