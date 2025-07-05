import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { BudgetFormData, BudgetCreateModalProps } from "../types";
import { CreateBudgetRequest } from "@/services/budgetService";
import {
  generateDefaultTitle,
  calculateDateRange,
  findCategoryById,
} from "../utils";

interface UseBudgetFormProps {
  initialBudget?: BudgetCreateModalProps["initialBudget"];
  period: BudgetCreateModalProps["period"];
  selectedYear: number;
  selectedMonth?: number;
  categoryOptions: Array<{ id: string; name: string; color: string }>;
  onSave: (budget: CreateBudgetRequest) => void;
}

export const useBudgetForm = ({
  initialBudget,
  period,
  selectedYear,
  selectedMonth,
  categoryOptions,
  onSave,
}: UseBudgetFormProps) => {
  const form = useForm<BudgetFormData>({
    defaultValues: {
      title: "",
      amount: 0,
      selectedCategoryId: "",
    },
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (initialBudget) {
      const firstCategory = initialBudget.categories[0];
      form.reset({
        title: initialBudget.title,
        amount: initialBudget.amount,
        selectedCategoryId: firstCategory?.categoryId || "",
      });
    } else {
      const defaultTitle = generateDefaultTitle(
        period,
        selectedYear,
        selectedMonth
      );
      form.reset({
        title: defaultTitle,
        amount: 0,
        selectedCategoryId: "",
      });
    }
  }, [initialBudget, period, selectedYear, selectedMonth, form]);

  const validateForm = (data: BudgetFormData) => {
    const errors: Partial<Record<keyof BudgetFormData, string>> = {};

    if (!data.title.trim()) {
      errors.title = "예산 제목을 입력해주세요";
    }

    if (!data.amount || data.amount <= 0) {
      errors.amount = "올바른 예산 금액을 입력해주세요";
    }

    if (!data.selectedCategoryId) {
      errors.selectedCategoryId = "카테고리를 선택해주세요";
    }

    return errors;
  };

  const handleSubmit = (data: BudgetFormData) => {
    const errors = validateForm(data);

    // 에러가 있다면 폼에 설정
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([key, message]) => {
        form.setError(key as keyof BudgetFormData, { message });
      });
      return;
    }

    const selectedCategory = findCategoryById(
      categoryOptions,
      data.selectedCategoryId
    );
    if (!selectedCategory) {
      form.setError("selectedCategoryId", {
        message: "카테고리를 선택해주세요",
      });
      return;
    }

    const { startDate, endDate } = calculateDateRange(
      period,
      selectedYear,
      selectedMonth
    );

    const budgetData: CreateBudgetRequest = {
      title: data.title,
      amount: data.amount,
      period,
      startDate,
      endDate,
      categories: [
        {
          categoryId: selectedCategory.id,
          categoryName: selectedCategory.name,
          allocatedAmount: data.amount,
          color: selectedCategory.color,
        },
      ],
    };

    onSave(budgetData);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    errors: form.formState.errors,
    isValid: form.formState.isValid,
  };
};
