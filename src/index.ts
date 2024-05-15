import { generate } from "@genkit-ai/ai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
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

const app = express();

// ** middleware **
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/generate", async (req, res) => {
  // const { subject } = req.body;
  // const summary = startFlowsServer({ flows: textSummaryGenerate, port: 3000 });
  // const summary = await textSummaryGenerate(subject);
  res.send("Hello World!");
});

app.listen(3000, () => {});
