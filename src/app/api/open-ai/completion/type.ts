import { z } from "zod";

export const openAICompletionRequestSchema = z.object({
  userContent: z.string(),
  systemContent: z.string(),
});
