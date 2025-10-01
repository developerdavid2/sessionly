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
        .withOptions({ clearOnDefault: true, history: "replace" }),
      page: parseAsInteger
        .withDefault(DEFAULT_PAGE)
        .withOptions({ clearOnDefault: true, history: "replace" }),
      status: parseAsStringEnum(Object.values(MeetingStatus)).withOptions({
        history: "replace",
      }),
      agentId: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true, history: "replace" }),
    },
    {
      shallow: false,
      throttleMs: 100, // Slightly increase throttle to reduce rapid updates
      clearOnDefault: true,
    },
  );
};
