import { appSettingsSchema, userSchema } from "@/lib/types";
import { z } from "zod";

export const getSettingsResponseSchema = z.object({
  appSettings: appSettingsSchema,
});

export const getUserResponseSchema = z.object({
  user: userSchema,
});
