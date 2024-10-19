import { z } from "zod";

export const appSettingsSchema = z.object({
  shouldExposeTimer: z.boolean(),
  tickSeconds: z.number(),
  selectedBGM: z.string().optional(),
  selectedVoice: z.string().optional(),
});

export type AppSettings = z.infer<typeof appSettingsSchema>;
