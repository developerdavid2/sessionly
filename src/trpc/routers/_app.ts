import { createTRPCRouter } from "../init";
import { agentRouter } from "@/modules/agents/server/procedure";
import { meetingRouter } from "@/modules/meetings/server/procedure";
import { premiumRouter } from "@/modules/premium/server/procedure";

export const appRouter = createTRPCRouter({
  agents: agentRouter,
  meetings: meetingRouter,
  premium: premiumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
