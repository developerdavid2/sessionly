import React, { useState } from "react";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { MeetingGetOne } from "@/modules/meetings/types";
import { useTRPC } from "@/trpc/client";

interface DeleteMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: MeetingGetOne;
}

export const DeleteMeetingDialog = ({
  open,
  onOpenChange,

  initialValues,
}: DeleteMeetingDialogProps) => {
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

  const removeMeeting = useMutation({
    ...trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions(),
        );
        router.push("/meetings");
      },
    }),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRemoveMeeting = async () => {
    setIsDeleting(true);
    try {
      if (!initialValues?.id) {
        toast.error("Meeting ID is missing. Cannot delete meeting.");
        setIsDeleting(false);
        return;
      }
      await removeMeeting.mutateAsync({ id: initialValues.id });
      toast.success("Meeting deleted successfully");
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
      description={`This will remove this meetings`}
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
          onClick={handleRemoveMeeting}
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
