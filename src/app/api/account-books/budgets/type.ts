import { z } from "zod";

const budgetSchema = z.object({
  targetDate: z.object({
    year: z.number(),
    month: z.number().optional(),
  }),
  title: z.string(),
  amount: z.number().positive(),
  description: z.string(),
  categoryId: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getBudgetsResponseSchema = z.record(z.string(), budgetSchema);

export const getBudgetResponseSchema = z.object({
  budget: budgetSchema,
});

export type Budget = z.infer<typeof budgetSchema> & {
  id: string;
};

export const createBudgetRequestParamsSchema = z.object({
  budget: budgetSchema.omit({
    createdAt: true,
    updatedAt: true,
  }),
});
