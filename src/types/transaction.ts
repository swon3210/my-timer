export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  date: string;
  paymentMethod?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilter {
  type?: "income" | "expense" | "all";
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

export interface TransactionFormData {
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  date: string;
  paymentMethod?: string;
  location?: string;
}

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}
