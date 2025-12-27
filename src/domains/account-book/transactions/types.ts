import { z } from "zod";

const transactionTypeSchema = z.enum([
  "INCOME",
  "EXPENSE",
  "INVESTMENT",
  "FLEX",
]);

const transactionPaymentMethodSchema = z.enum([
  "CASH",
  "CREDIT_CARD",
  "DEBIT_CARD",
  "TRANSFER",
]);

export type TransactionPaymentMethod = z.infer<
  typeof transactionPaymentMethodSchema
>;

export type TransactionType = z.infer<typeof transactionTypeSchema>;

const transactionSchema = z.object({
  userId: z.string().optional(),
  amount: z.number(),
  type: transactionTypeSchema,
  categoryId: z.string(),
  description: z.string(),
  date: z.string(),
  paymentMethod: transactionPaymentMethodSchema.optional(),
  location: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema> & {
  id: string;
};

export const getTransactionsResponseSchema = z.record(
  z.string(),
  transactionSchema
);

export const createTransactionRequestParamsSchema = z.object({
  transaction: transactionSchema.omit({
    createdAt: true,
    updatedAt: true,
    userId: true,
  }),
});

export type CreateTransactionRequestParams = z.infer<
  typeof createTransactionRequestParamsSchema
>;

export const updateTransactionRequestParamsSchema = z.object({
  transaction: transactionSchema.omit({
    createdAt: true,
    updatedAt: true,
    userId: true,
  }),
});

export type UpdateTransactionRequestParams = z.infer<
  typeof updateTransactionRequestParamsSchema
>;
export type Frequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export const frequencySchema = z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);
