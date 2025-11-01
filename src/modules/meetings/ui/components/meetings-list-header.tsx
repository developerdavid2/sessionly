"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";

import NewMeetingDialog from "@/modules/meetings/ui/components/new-meeting-dialog";
import { MeetingsSearchFilter } from "@/modules/meetings/ui/components/meetings-search-filter";
import { StatusFilter } from "@/modules/meetings/ui/components/status-filter";
import { AgentIdFilter } from "@/modules/meetings/ui/components/agent-id-filter";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    // Use null for status to properly clear the enum filter
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>

          {/* CTA Button */}

          <Button
            onClick={() => setIsDialogOpen(true)}
            className={cn(
              "relative h-12 rounded-xl font-semibold text-sm tracking-wide text-white overflow-hidden group",
              "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50 shadow-xl",
            )}
          >
            {/* Inner glow overlay */}
            <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"></span>

            {/* Top edge glow */}
            <span className="absolute left-[40%] top-0 z-[6] h-[2px] w-[60%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-4 transition-all duration-500 pointer-events-none"></span>

            {/* Bottom edge glow */}
            <span className="absolute bottom-0 left-4 z-[6] h-[2px] w-[35%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-[60%] transition-all duration-500 pointer-events-none"></span>

            <span className="relative z-10 flex items-center gap-x-2">
              {" "}
              <PlusIcon />
              New Meetings
            </span>
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <XCircleIcon />
                Clear Filters
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
