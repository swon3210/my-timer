"use client";

import BudgetList from "./BudgetList";
import BudgetFormDialogButton from "./BudgetFormDialogButton";

export default function BudgetPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">예산 관리</h3>
        <BudgetFormDialogButton />
      </div>
      <BudgetList />
    </div>
  );
}
