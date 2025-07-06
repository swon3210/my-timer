"use client";

import { useBudgetFormModal } from "../../_components/BudgetFormModal/BudgetCreateModal";
import { useAddBudgetMutation } from "@/domains/account-book/budgets/useAddBudgetMutation";
import { toast } from "sonner";
import { getPeriod } from "../../_components/BudgetFormModal/utils";

interface EmptyBudgetProps {
  selectedMonth: number;
  selectedYear: number;
}

export default function EmptyBudget({
  selectedMonth,
  selectedYear,
}: EmptyBudgetProps) {
  const { mutateAsync: addBudget } = useAddBudgetMutation();

  const { openBudgetFormModal } = useBudgetFormModal();

  const handleCreateBudgetButtonClick = async () => {
    const budgetFormValues = await openBudgetFormModal();

    if (!budgetFormValues) {
      return;
    }

    try {
      const { startDate, endDate } = getPeriod(selectedYear, selectedMonth);

      await addBudget({
        ...budgetFormValues,
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
      });

      toast.success("예산이 성공적으로 생성되었습니다.");
    } catch (error) {
      toast.error("예산 생성에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="grow flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          월간 예산을 설정해보세요
        </h2>
        <p className="text-gray-600 mb-6">
          {selectedYear}년 {selectedMonth}월 예산을 설정하여 지출을 체계적으로
          관리할 수 있습니다.
        </p>
        <button
          onClick={handleCreateBudgetButtonClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          예산 설정하기
        </button>
      </div>
    </div>
  );
}
