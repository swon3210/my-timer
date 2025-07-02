import { z } from "zod";

const prioritySchema = z.enum(["HIGH", "MEDIUM", "LOW"]);

export type Priority = z.infer<typeof prioritySchema>;

const statusSchema = z.enum(["ON-GOING", "COMPLETED", "CANCELLED"]);

export type Status = z.infer<typeof statusSchema>;

export const goalSchema = z.object({
  categoryId: z.string(),
  priority: prioritySchema,
  displayName: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  targetAmount: z.number(),
  startAt: z.string(),
  endAt: z.string(),
  status: statusSchema,
});

export type Goal = z.infer<typeof goalSchema> & {
  id: string;
};
