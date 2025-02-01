import { TransactionType } from "@/domains/account-book/types";

export type BudgetFormValues = {
  amount: number;
  categoryId: string;
  type: TransactionType;
};
