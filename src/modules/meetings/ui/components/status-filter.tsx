import { MeetingStatus } from "@/modules/meetings/types";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { CommandSelect } from "@/components/command-select";
import { DEFAULT_PAGE } from "@/constants";

const options = [
  {
    id: "all",
    value: "",
    children: (
      <div className="flex items-center gap-x-2 capitalize">All Statuses</div>
    ),
  },
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) =>
        setFilters({
          status: value === "" ? null : (value as MeetingStatus),
          page: DEFAULT_PAGE, // Reset to first page when filter changes
        })
      }
      value={filters.status ?? ""}
    />
  );
};
