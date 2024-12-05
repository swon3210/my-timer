import { appSettingsSchema } from "@/lib/types";
import { z } from "zod";

export const getSettingsResponseSchema = z.object({
  appSettings: appSettingsSchema,
});

export const checkAuthResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});
