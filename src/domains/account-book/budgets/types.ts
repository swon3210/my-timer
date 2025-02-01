import { TransactionType } from "../types";

export type Budget = {
  id: string;
  amount: number;
  categoryId: string;
  type: TransactionType;
  date: string;
};
