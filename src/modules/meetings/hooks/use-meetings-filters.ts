import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { DEFAULT_PAGE } from "@/constants";
import { MeetingStatus } from "@/modules/meetings/types";

export const useMeetingsFilters = () => {
  return useQueryStates(
    {
      search: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
      page: parseAsInteger
        .withDefault(DEFAULT_PAGE)
        .withOptions({ clearOnDefault: true }),
      status: parseAsStringEnum(Object.values(MeetingStatus)),
      agentId: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
    },
    {
      shallow: false, // This prevents infinite re-renders
      throttleMs: 50, // Throttle updates
    },
  );
};

// https://localhost:3000/agents?search=hello&page=2 <====> useState({search:'hello', page: 2})
