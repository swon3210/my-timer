"use client";

import ExpenseSummary from "./_components/ExpenseSummary";
import ExpenseTabs from "./_components/ExpenseTabs";
import SelectedExpenseList from "./SelectedExpenseList";

export default function AccountBookHomePage() {
  return (
    <div className="grow flex flex-col gap-6 pt-4">
      <ExpenseSummary />
      <div className="flex flex-col grow rounded-t-3xl overflow-hidden bg-mint-light p-5 gap-6">
        {/* <SelectedExpenseSummary /> */}
        <div className="flex flex-col gap-4">
          <ExpenseTabs />
          <SelectedExpenseList />
        </div>
      </div>
    </div>
  );
}
