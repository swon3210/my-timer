import { TransactionType } from "@/domains/account-book/types";

export type OutcomeFormValues = {
  amount: number;
  categoryId: string;
  type: TransactionType;
};

export type IncomeFormValues = {
  amount: number;
  categoryId: string;
};
