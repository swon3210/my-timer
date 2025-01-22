export type TransactionType = "EXPENSE" | "INCOME" | "INVESTMENT" | "FLEX";

export interface BaseAccountItem {
  id: string;
  amount: number;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  categoryDisplayedName: string;
}

export interface ExpenseAccountItem extends BaseAccountItem {
  type: "EXPENSE";
}

export interface IncomeAccountItem extends BaseAccountItem {
  type: "INCOME";
}

export interface FlexAccountItem extends BaseAccountItem {
  type: "FLEX";
}

export type AccountItem =
  | ExpenseAccountItem
  | IncomeAccountItem
  | FlexAccountItem;
