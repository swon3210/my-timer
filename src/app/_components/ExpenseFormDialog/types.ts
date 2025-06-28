import { TransactionType } from "@/app/api/account-books/transactions/types";
import { Frequency } from "@/domains/account-book/types";

export type ExpenseFormValues = {
  type: TransactionType;
  categoryId: string | undefined;
  amount: number;
  description: string;
  date: string;
  frequency: Frequency | undefined;
};
