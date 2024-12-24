import { z } from "zod";

export const appSettingsSchema = z.object({
  shouldExposeTimer: z.boolean(),
  tickSeconds: z.number(),
  selectedBGM: z.string().optional(),
  selectedVoice: z.string().optional(),
});

export type AppSettings = z.infer<typeof appSettingsSchema>;

export const userSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
