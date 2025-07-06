"use client";

import { Budget } from "@/app/api/account-books/budgets/type";
import { formatCurrency } from "@/utils/format";
import { useBudgetFormModal } from "../../_components/BudgetFormModal/BudgetCreateModal";
import { useDeleteBudgetMutation } from "@/domains/account-book/budgets/useDeleteBudgetsMutation";
import { useUpdateBudgetMutation } from "@/domains/account-book/budgets/useUpdateBudgetsMutation";
import { getPeriod } from "../../_components/BudgetFormModal/utils";
import { toast } from "sonner";

interface BudgetListProps {
  budgets: Budget[];
  selectedMonth: number;
  selectedYear: number;
}

export default function BudgetList({
  budgets,
  selectedMonth,
  selectedYear,
}: BudgetListProps) {
  // 선택된 월에 해당하는 예산만 필터링
  const filteredBudgets = budgets.filter((budget) => {
    const budgetStartDate = new Date(budget.startAt);
    const budgetEndDate = new Date(budget.endAt);
    const selectedDate = new Date(selectedYear, selectedMonth);

    return selectedDate >= budgetStartDate && selectedDate <= budgetEndDate;
  });

  const { mutateAsync: updateBudget } = useUpdateBudgetMutation();
  const { mutateAsync: deleteBudget } = useDeleteBudgetMutation();

  const { openBudgetFormModal } = useBudgetFormModal();

  const handleEditBudgetButtonClick = async (budget: Budget) => {
    const budgetFormValues = await openBudgetFormModal({
      defaultValues: budget,
    });

    if (!budgetFormValues) {
      return;
    }

    const { startDate, endDate } = getPeriod(selectedYear, selectedMonth);

    try {
      await updateBudget({
        id: budget.id,
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
        ...budgetFormValues,
      });

      toast.success("예산이 성공적으로 수정되었습니다.");
    } catch (error) {
      toast.error("예산 수정에 실패했습니다.");
      console.error(error);
    }
  };

  const handleDeleteBudgetButtonClick = async (budget: Budget) => {
    if (!confirm("정말로 이 예산을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteBudget(budget.id);
      toast.success("예산이 성공적으로 삭제되었습니다.");
    } catch (error) {
      toast.error("예산 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {filteredBudgets.map((budget) => (
        <div
          key={budget.id}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {budget.title}
              </h3>
              <p className="text-sm text-gray-600">{budget.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditBudgetButtonClick(budget)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteBudgetButtonClick(budget)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">예산 금액</span>
            <span className="text-lg font-semibold text-blue-600">
              {formatCurrency(budget.amount)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
