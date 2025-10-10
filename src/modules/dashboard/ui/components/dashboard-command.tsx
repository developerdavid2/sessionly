import React, { Dispatch, SetStateAction, useState } from "react";
import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { LoaderIcon } from "lucide-react";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const trpc = useTRPC();
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 100,
    }),
  );

  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      search,
      pageSize: 100,
    }),
  );

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        placeholder="Find a meeting or agent"
        value={search}
        onValueChange={(value) => setSearch(value)}
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          {meetings.isLoading ? (
            <div className="flex items-center justify-center py-6">
              <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <CommandEmpty>
                <span className="text-muted-foreground text-sm">
                  No meetings found.
                </span>
              </CommandEmpty>
              {meetings.data?.items.map((meeting) => (
                <CommandItem
                  key={meeting.id}
                  className="cursor-pointer"
                  onSelect={() => {
                    router.push(`/meetings/${meeting.id}`);
                    setOpen(false);
                  }}
                >
                  {meeting.name}
                </CommandItem>
              ))}
            </>
          )}
        </CommandGroup>
        <CommandGroup heading="Agents">
          {agents.isLoading ? (
            <div className="flex items-center justify-center py-6">
              <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <CommandEmpty>
                <span className="text-muted-foreground text-sm">
                  No agents found.
                </span>
              </CommandEmpty>
              {agents.data?.items.map((agent) => (
                <CommandItem
                  key={agent.id}
                  className="cursor-pointer"
                  onSelect={() => {
                    router.push(`/agents/${agent.id}`);
                    setOpen(false);
                  }}
                >
                  <GeneratedAvatar
                    seed={agent.name}
                    variant="botttsNeutral"
                    className="size-5"
                  />
                  {agent.name}
                </CommandItem>
              ))}
            </>
          )}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
export default DashboardCommand;
