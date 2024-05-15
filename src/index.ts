import { generate } from "@genkit-ai/ai";
import { configureGenkit } from "@genkit-ai/core";
import { defineFlow, startFlowsServer } from "@genkit-ai/flow";
import { geminiPro } from "@genkit-ai/googleai";
import * as z from "zod";
import { googleAI } from "@genkit-ai/googleai";

configureGenkit({
  plugins: [googleAI()],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});

export const textSummaryGenerate = defineFlow(
  {
    name: "textSummaryGenerate",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `write an two lines, that describe the topic ${subject}`,
      model: geminiPro,
      config: {
        temperature: 1,
        maxOutputTokens: 1000,
      },
    });

    return llmResponse.text();
  }
);

startFlowsServer();
