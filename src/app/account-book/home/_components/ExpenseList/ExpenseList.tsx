"use client";

import { TabType } from "../ExpenseTabs/ExpenseTabs";
import useBudgetStatusCategories from "../../_hooks/useBudgetStatusCategories";
import SummaryItem from "./SummaryItem";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ activeTab }: { activeTab: TabType }) {
  const expenseCategories = useBudgetStatusCategories(activeTab);

  const totalExpense = Math.abs(
    expenseCategories.reduce((sum, category) => sum + category.totalExpense, 0)
  );

  const totalBudget = expenseCategories.reduce(
    (sum, category) => sum + category.totalBudget,
    0
  );

  const overallProgress =
    totalBudget > 0
      ? Math.min((Math.abs(totalExpense) / totalBudget) * 100, 100)
      : 0;

  const positiveOverallProgress = Math.min(overallProgress, 100);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-200 rounded-3xl p-6 shadow-lg shadow-primary/20 flex flex-col gap-6">
      <SummaryItem
        totalExpense={totalExpense}
        totalBudget={totalBudget}
        overallProgress={positiveOverallProgress}
      />
      <div className="space-y-4">
        {/* {expenseCategories.map((category) => (
          <ExpenseItem key={category.id} category={category} />
        ))} */}
        {expenseCategories.map((category) => (
          <ExpenseItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
