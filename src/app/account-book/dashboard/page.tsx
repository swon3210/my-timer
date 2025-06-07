"use client";

import ExpenseSummary from "./ExpenseSummary";
import ExpenseTabs from "./ExpenseTabs/ExpenseTabs";
import SelectedExpenseSummary from "./SelectedExpenseSummary";
import SelectedExpenseList from "./SelectedExpenseList";

export default function AccountBookPage() {
  return (
    <div className="grow flex flex-col gap-6 pt-4">
      <ExpenseSummary />
      <div className="flex flex-col grow rounded-t-3xl overflow-hidden bg-secondary p-5 gap-6">
        {/* <SelectedExpenseSummary /> */}
        <div className="flex flex-col gap-4">
          <ExpenseTabs />
          <SelectedExpenseList />
        </div>
      </div>
    </div>
  );
}
