"use client";

import { Budget } from "@/app/api/account-books/budgets/type";
import BudgetItem from "./BudgetItem";

interface BudgetListProps {
  budgets: Budget[];
  selectedYear: number;
}

export default function BudgetList({ budgets, selectedYear }: BudgetListProps) {
  const filteredBudgets = budgets.filter((budget) => {
    return budget.targetDate.year === selectedYear;
  });

  return (
    <div className="space-y-4">
      {filteredBudgets.map((budget) => (
        <BudgetItem key={budget.id} budget={budget} />
      ))}
    </div>
  );
}
