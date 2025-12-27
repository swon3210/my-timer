"use client";

import { Budget } from "@/domains/account-book/budgets/type";
import BudgetItem from "./BudgetItem";

interface BudgetListProps {
  budgets: Budget[];
  selectedWeekPeriod?: [number, number];
  selectedMonth?: number;
  selectedYear: number;
}

export default function BudgetList({
  budgets,
  selectedWeekPeriod,
  selectedMonth,
  selectedYear,
}: BudgetListProps) {
  const filteredBudgets = budgets.filter((budget) => {
    return (
      budget.targetDate.year === selectedYear &&
      budget.targetDate.month === selectedMonth &&
      budget.targetDate.weekPeriod?.[0] === selectedWeekPeriod?.[0] &&
      budget.targetDate.weekPeriod?.[1] === selectedWeekPeriod?.[1]
    );
  });

  return (
    <div className="space-y-4">
      {filteredBudgets.map((budget) => (
        <BudgetItem key={budget.id} budget={budget} />
      ))}
    </div>
  );
}
