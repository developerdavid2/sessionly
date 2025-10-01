import React, { useState } from "react";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CommandSelect } from "@/components/command-select";
import { DEFAULT_PAGE } from "@/constants";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [agentSearch, setAgentSearch] = useState("");
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch }),
  );

  const options = [
    {
      id: "all",
      value: "",
      children: <div className="flex items-center gap-x-2">All Agents</div>,
    },
    ...(data?.items.map((agent) => ({
      id: agent.id,
      value: agent.id,
      children: (
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            seed={agent.name}
            variant="botttsNeutral"
            className="size-4"
          />
          {agent.name}
        </div>
      ),
    })) ?? []),
  ];

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={options}
      onSelect={(value) =>
        setFilters({
          agentId: value,
          page: DEFAULT_PAGE, // Reset to first page when filter changes
        })
      }
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  );
};
