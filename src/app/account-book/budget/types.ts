import { TransactionType } from "@/app/api/account-books/transactions/types";

export type OutcomeFormValues = {
  amount: number;
  categoryId: string;
  type: TransactionType;
};

export type IncomeFormValues = {
  amount: number;
  categoryId: string;
};
