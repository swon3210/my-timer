import { Budget } from "@/app/api/account-books/budgets/type";
import { UseFormRegister, FieldError } from "react-hook-form";

export interface BudgetCreateModalProps {
  title: string;
  isOpen: boolean;
  close: (values?: BudgetFormValues) => void;
  defaultValues?: BudgetFormValues;
}

export type BudgetFormValues = Omit<
  Budget,
  "id" | "createdAt" | "updatedAt" | "startAt" | "endAt" | "targetDate"
>;

export interface CategoryOption {
  id: string;
  name: string;
  color: string;
}

export interface CategorySelectorProps {
  categories: CategoryOption[];
  register: UseFormRegister<BudgetFormValues>;
  error?: FieldError;
}

export interface BudgetAmountInputProps {
  register: UseFormRegister<BudgetFormValues>;
  error?: FieldError;
}

export interface BudgetTitleInputProps {
  register: UseFormRegister<BudgetFormValues>;
  error?: FieldError;
}

export interface BudgetDisplayNameInputProps {
  register: UseFormRegister<BudgetFormValues>;
  error?: FieldError;
}

export interface BudgetDescriptionInputProps {
  register: UseFormRegister<BudgetFormValues>;
  error?: FieldError;
}
