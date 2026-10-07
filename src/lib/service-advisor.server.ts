import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayRunIdFetch } from "./run-id.server";
import { SERVICES, SERVICE_IDS } from "./services";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const resultSchema = z.object({
  serviceId: z.enum(SERVICE_IDS),
  reason: z.string(),
  alternativeId: z.enum(SERVICE_IDS).nullable(),
});

export type AdvisorResult = z.infer<typeof resultSchema>;

export class AdvisorError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function recommendService(goals: string): Promise<AdvisorResult> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new AdvisorError("The advisor is not configured yet.", 500);

  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const catalogue = SERVICES.map((s) => `- ${s.id}: ${s.title} — ${s.summary}`).join("\n");

  const result = streamText({
    model: provider.responses(MODEL),
    instructions:
      "You are the service advisor for Balance Design & Fashion Consultancy. " +
      "Read the prospective client's goals and pick the single most relevant service from the catalogue. " +
      "Optionally pick one alternative service that would also help, or null. " +
      "Write the reason in 2-3 warm, concise sentences addressed to the client (use 'you'). " +
      "Never invent prices, dates, names or facts not in the catalogue.\n\nCatalogue:\n" +
      catalogue,
    prompt: goals,
    output: Output.object({ schema: resultSchema }),
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  try {
    return await result.output;
  } catch (error) {
    const status = (error as { statusCode?: number }).statusCode;
    if (status === 429) throw new AdvisorError("Too many requests right now. Please try again in a minute.", 429);
    if (status === 402 || status === 403)
      throw new AdvisorError("The advisor is temporarily unavailable. Please contact us directly.", status);
    console.error("Service advisor failed", error);
    throw new AdvisorError("We couldn't generate a recommendation. Please try again.", 500);
  }
}
