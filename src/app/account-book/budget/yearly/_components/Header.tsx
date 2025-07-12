"use client";

import { useAddBudgetMutation } from "@/domains/account-book/budgets/useAddBudgetMutation";
import { useBudgetFormModal } from "../../_components/BudgetFormModal";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
  description: string;
  selectedYear: number;
}

export default function Header({
  title,
  description,
  selectedYear,
}: HeaderProps) {
  const { openBudgetFormModal } = useBudgetFormModal();
  const { mutateAsync: addBudget } = useAddBudgetMutation();

  const handleAddBudgetButtonClick = async () => {
    const budgetFormValues = await openBudgetFormModal({
      title: `${selectedYear}년 예산 설정`,
    });

    if (!budgetFormValues) {
      return;
    }

    try {
      await addBudget({
        ...budgetFormValues,
        targetDate: {
          year: selectedYear,
        },
      });

      toast.success("예산이 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("예산 추가에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>

      <button
        type="button"
        className="flex items-center space-x-2 p-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        onClick={handleAddBudgetButtonClick}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
