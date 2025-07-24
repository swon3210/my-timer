import { z } from "zod";

export const openAICompletionRequestSchema = z.object({
  model: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["system", "assistant", "user"]),
      content: z.string().or(
        z.array(
          z.union([
            z.object({ type: z.literal("text"), text: z.string() }),
            z.object({
              type: z.literal("image_url"),
              image_url: z.object({ url: z.string() }),
            }),
          ])
        )
      ),
    })
  ),
  max_tokens: z.number(),
});

export type OpenAICompletionRequestParams = z.infer<
  typeof openAICompletionRequestSchema
>;
