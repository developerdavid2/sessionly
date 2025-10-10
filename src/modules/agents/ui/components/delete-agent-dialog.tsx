import React, { useState } from "react";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { AgentGetOne } from "@/modules/agents/types";
import { useTRPC } from "@/trpc/client";

interface DeleteAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  initialValues?: AgentGetOne;
}

const DeleteAgentDialog = ({
  open,
  onOpenChange,

  initialValues,
}: DeleteAgentDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleOpenChange = (updateOpen: boolean) => {
    // Prevent closing if form is submitting
    if (!isDeleting) {
      onOpenChange(updateOpen);
    }
  };

  const removeAgent = useMutation({
    ...trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions(),
        );
        router.push("/agents");
      },
    }),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRemoveAgent = async () => {
    setIsDeleting(true);
    try {
      if (!initialValues?.id) {
        toast.error("Agent ID is missing. Cannot delete agent.");
        setIsDeleting(false);
        return;
      }
      await removeAgent.mutateAsync({ id: initialValues.id });
      toast.success("Agent deleted successfully");
      onOpenChange(false);
    } catch (error) {
      console.log(error);
      // Error handled by mutation
    } finally {
      setIsDeleting(false);
      onOpenChange(false);
    }
  };

  return (
    <ResponsiveDialog
      title="Are you sure?"
      description={`This will remove ${initialValues?.meetingCount} associated meetings`}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
        <Button
          onClick={() => onOpenChange(false)}
          variant="outline"
          className="w-full lg:w-auto"
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleRemoveAgent}
          className="w-full lg:w-auto"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </ResponsiveDialog>
  );
};

export default DeleteAgentDialog;
