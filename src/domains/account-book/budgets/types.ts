import { TransactionType } from "@/app/api/account-books/transactions/types";

export type Budget = {
  id: string;
  amount: number;
  categoryId: string;
  type: TransactionType;
  date: string;
};
