import { Budget } from "@/types/budget";
import { CreateBudgetRequest } from "@/services/budgetService";

export interface BudgetCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: CreateBudgetRequest) => void;
  period: "weekly" | "monthly" | "yearly";
  initialBudget?: Budget;
  selectedYear: number;
  selectedMonth?: number;
}

export interface BudgetFormData {
  title: string;
  amount: number;
  selectedCategoryId: string;
}

export interface CategoryOption {
  id: string;
  name: string;
  color: string;
}

export interface CategorySelectorProps {
  categories: CategoryOption[];
  selectedCategoryId: string;
  onCategorySelect: (categoryId: string) => void;
  error?: string;
}

export interface BudgetAmountInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}
