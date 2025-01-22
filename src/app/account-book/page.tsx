"use client";

import ExpenseSummary from "./ExpenseSummary";
import MonthManager from "./MonthManager";

export default function AccountBookPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-center">
        <MonthManager />
      </div>
      <ExpenseSummary />
    </div>
  );
}
