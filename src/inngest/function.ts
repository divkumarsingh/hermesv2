import { inngest } from "@/inngest/client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import {openai} from "@ai-sdk/openai";
import { createOpenAI } from "@ai-sdk/openai";
import { Anthropic } from "inngest";
import {createAnthropic} from "@ai-sdk/anthropic"

const google = createGoogleGenerativeAI();
const openAi = createOpenAI({});
const anthropic = createAnthropic({});

export const execute = inngest.createFunction(
  { id: "execute-ai", triggers: {event: "execute/ai"} },
  async ({ event, step }: { event: any; step: any }) => {
    const { steps } = await step.ai.wrap(
      "gemini-generate-text",
      async () =>
        generateText({
          model: google("gemini-3.5-flash-lite"),
          system: "You are a helpful assistant.",
          prompt: "What is 2 + 2?",
        })
    );

    return { steps };
  }
);