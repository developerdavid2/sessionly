import { inngest } from "./client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import JSONL from "jsonl-parse-stringify";
import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { createAgent, openai, TextMessage } from "@inngest/agent-kit";
import { streamVideo } from "@/lib/stream-video";

const summarizer = createAgent({
  name: "summarizer",
  system: `
  You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z
  `.trim(),
  model: openai({ model: "gpt-4o", apiKey: process.env.OPENAI_API_KEY }),
});

export const meetingProcessing = inngest.createFunction(
  { id: "meetings/processing", triggers: { event: "meetings/processing" } },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) => {
          return users.map((user) => ({
            ...user,
          }));
        });

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) => {
          return agents.map((agent) => ({
            ...agent,
          }));
        });

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id,
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown",
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    const { output } = await summarizer.run(
      `Summarize the following transcript ${JSON.stringify(transcriptWithSpeakers)}`,
    );

    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: (output[0] as TextMessage).content as string,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });
  },
);

/**
 * Connects the realtime OpenAI agent to a Stream call in the background.
 * This used to run inline inside the call.session_started webhook handler,
 * which blocked the webhook's response and caused Stream delivery timeouts
 * ("context deadline exceeded") whenever the OpenAI handshake was slow.
 * Acking the webhook immediately and doing this connection here instead
 * means a slow handshake can never cause a webhook delivery failure again.
 */
export const connectAgentToCall = inngest.createFunction(
  {
    id: "meetings/agent.connect",
    triggers: { event: "meetings/agent.connect" },
  },
  async ({ event, step }) => {
    const { meetingId, agentId, agentInstructions } = event.data as {
      meetingId: string;
      agentId: string;
      agentInstructions: string;
    };

    await step.run("connect-openai-agent", async () => {
      const call = streamVideo.video.call("default", meetingId);

      const realtimeClient = await streamVideo.video.connectOpenAi({
        call,
        openAiApiKey: process.env.OPENAI_API_KEY!,
        agentUserId: agentId,
      });

      realtimeClient.updateSession({
        instructions: agentInstructions,
      });

      return { connected: true, meetingId, agentId };
    });
  },
);
