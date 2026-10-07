import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { AdvisorError, recommendService } from "./service-advisor.server";

export const getServiceRecommendation = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ goals: z.string().trim().min(10).max(1500) }).parse(data))
  .handler(async ({ data }) => {
    try {
      return { ok: true as const, result: await recommendService(data.goals) };
    } catch (error) {
      const message =
        error instanceof AdvisorError ? error.message : "We couldn't generate a recommendation. Please try again.";
      return { ok: false as const, error: message };
    }
  });
