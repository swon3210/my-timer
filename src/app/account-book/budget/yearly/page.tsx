"use client";

import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import Navigation from "../../dashboard/Navigation";

export default function MonthlyBudgetPage() {
  const { data: budgets } = useBudgetsQuery();

  const incomeBudgets = budgets?.filter((budget) => budget.type === "INCOME");
  const expenseBudgets = budgets?.filter((budget) => budget.type === "EXPENSE");

  const totalIncome =
    incomeBudgets?.reduce((acc, budget) => acc + budget.amount, 0) ?? 0;

  const totalExpense =
    expenseBudgets?.reduce((acc, budget) => acc + budget.amount, 0) ?? 0;

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <Navigation />
        <div className="flex flex-col space-y-8">
          <h1 className="text-2xl font-bold">연 예산</h1>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              예산 ({totalIncome?.toLocaleString()}원)
            </h2>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              지출 계획 ({totalExpense?.toLocaleString()}원)
            </h2>
          </div>

          <div className="space-y-2 flex justify-end">
            <h2 className="text-lg font-semibold">
              남은 금액: {(totalIncome - totalExpense).toLocaleString()}원
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
