import { Budget } from "@/app/api/budgets/type";

export interface BudgetCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: BudgetFormValues;
}

export type BudgetFormValues = Omit<
  Budget,
  "id" | "createdAt" | "updatedAt" | "startAt" | "endAt"
>;

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
