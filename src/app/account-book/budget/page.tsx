"use client";

import BudgetList from "./BudgetList";
import OverlayProvider from "@/providers/OverlayProvider";
import IncomeList from "./IncomeList";

export default function BudgetPage() {
  return (
    <OverlayProvider>
      <div className="space-y-12 p-6">
        <IncomeList />

        <div className="h-[1px] bg-gray-200" />

        <BudgetList />
      </div>
    </OverlayProvider>
  );
}
