"use client";

import ExpenseSummary from "./ExpenseSummary";
import ExpenseTabs from "./ExpenseTabs/ExpenseTabs";
import SelectedExpenseSummary from "./SelectedExpenseSummary";
import SelectedExpenseList from "./SelectedExpenseList";

export default function AccountBookPage() {
  return (
    <div className="grow flex flex-col gap-6 pt-4">
      <ExpenseSummary />
      <div className="flex flex-col grow rounded-t-3xl overflow-hidden bg-secondary p-6 gap-6">
        <SelectedExpenseSummary />
        <div className="flex flex-col gap-4">
          <ExpenseTabs />
          <h3 className="pl-4 text-md font-semibold text-secondary-foreground text-center">
            2월 10일 - 2월 16일
          </h3>
          <SelectedExpenseList />
        </div>
      </div>
    </div>
  );
}
