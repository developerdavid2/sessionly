"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MeetingGetMany } from "@/modules/meetings/types";
import { format } from "date-fns";
import { cn, formatDuration } from "@/lib/utils";

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-400/10 text-yellow-500 border-yellow-800/5",
  active: "bg-blue-400/10 text-blue-500 border-blue-800/5",
  completed: "bg-emerald-400/10 text-emerald-500 border-emerald-800/5",
  processing: "bg-gray-400/10 text-gray-500 border-gray-800/5",
  cancelled: "bg-rose-400/10 text-rose-500 border-rose-800/5",
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-neutral-500" />
            <span className="text-sm text-neutral-500 max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>
          <GeneratedAvatar
            seed={row.original.agent.name}
            variant="botttsNeutral"
            className="size-6"
          />
          <span className="text-sm ">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize [&>svg]:size-4 text-muted-foreground",
            statusColorMap[row.original.status as keyof typeof statusColorMap],
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin",
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="capitalize [&>svg]:size-4 text-neutral-500"
      >
        <ClockFadingIcon className="text-blue-500" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "No duration"}
      </Badge>
    ),
  },
];
