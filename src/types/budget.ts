export interface Budget {
  id: string;
  userId: string;
  title: string;
  amount: number;
  period: "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
  categories: CategoryBudget[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryBudget {
  id: string;
  categoryId: string;
  categoryName: string;
  allocatedAmount: number;
  spentAmount: number;
  color: string;
}

export interface BudgetStatus {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  progressPercentage: number;
  isOverBudget: boolean;
  categories: CategoryStatus[];
}

export interface CategoryStatus {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number;
  isOverBudget: boolean;
  color: string;
}

export interface BudgetAlert {
  id: string;
  type: "warning" | "danger";
  message: string;
  categoryId?: string;
  timestamp: Date;
}
