"use client";

import ExpenseList from "./ExpenseList";

export default function AccountBookHistoryPage() {
  return (
    <div className="grow flex flex-col gap-6">
      <div className="flex flex-col grow rounded-t-3xl overflow-hidden bg-mint-light p-5 gap-6">
        <ExpenseList />
      </div>
    </div>
  );
}
