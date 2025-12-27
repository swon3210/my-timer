import {
  Transaction,
  TransactionType,
} from "@/domains/account-book/transactions/types";

export interface TransactionFilter {
  type?: TransactionType | "ALL";
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}

export interface TransactionSort {
  field: "date" | "amount" | "category";
  direction: "asc" | "desc";
}

export type TransactionFormData = Omit<
  Transaction,
  "createdAt" | "updatedAt" | "userId" | "id"
>;

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}
