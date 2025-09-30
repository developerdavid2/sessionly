import React, { useEffect, useState } from "react";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { MeetingGetOne } from "@/modules/meetings/types";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useDebounce } from "@/hooks/use-debounce";
import NewAgentDialog from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingsFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
  onPendingChange?: (isPending: boolean) => void;
}

const MeetingsForm = ({
  onSuccess,
  onCancel,
  initialValues,
  onPendingChange,
}: MeetingsFormProps) => {
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

  const [agentSearch, setAgentSearch] = useState("");
  const debouncedSearch = useDebounce(agentSearch, 300);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Use regular useQuery with debounced search
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search: debouncedSearch,
      pageSize: 100,
    }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        toast.success("Meeting created successfully");

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
        //TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        toast.success("Meeting updated successfully");

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
        //TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade
      },
    }),
  );

  type FormSchema = z.infer<typeof meetingsInsertSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  // Notify parent component when pending state changes
  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  const onSubmit = (values: FormSchema) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues!.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  const handleCancel = () => {
    if (!isPending) {
      onCancel?.();
    }
  };

  const getButtonText = () => {
    if (isPending) {
      return isEdit ? "Updating..." : "Creating...";
    }
    return isEdit ? "Update" : "Create";
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g Math consultation"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Select an agent"
                    disabled={isPending}
                    isLoading={agents.isLoading || agents.isFetching}
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Create new agent
                  </button>
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-x-2">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
            <Button disabled={isPending} type="submit">
              {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {getButtonText()}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MeetingsForm;
