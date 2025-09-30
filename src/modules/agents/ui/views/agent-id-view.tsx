"use client";

import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import AgentDetailSkeleton from "@/modules/agents/ui/views/agent-id-loading-state";
import AgentDetailError from "@/modules/agents/ui/views/agent-id-error-state";
import AgentIdViewHeader from "@/modules/agents/ui/components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import UpdateAgentDialog from "@/modules/agents/ui/components/update-agent-dialog";
import DeleteAgentDialog from "@/modules/agents/ui/components/delete-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  return (
    <>
      <DeleteAgentDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        initialValues={data}
      />
      <UpdateAgentDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setIsUpdateDialogOpen(true)}
          onRemove={() => setIsDeleteDialogOpen(true)}
        />

        <div className="bg-background rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                seed={data.name}
                variant="botttsNeutral"
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700 dark:text-blue-300" />
              {data.meetingCount}
              {data.meetingCount === 1 ? " meeting" : " meetings"}
            </Badge>

            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdViewLoading = () => {
  return <AgentDetailSkeleton />;
};

export const AgentIdViewError = () => {
  return <AgentDetailError />;
};
