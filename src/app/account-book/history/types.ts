import { TransactionType } from "@/domains/account-book/types";

export type ExpenseFormValues = {
  type: Exclude<TransactionType, "INVESTMENT">;
  categoryId: string | undefined;
  amount: number;
  description: string;
  date: string;
};
