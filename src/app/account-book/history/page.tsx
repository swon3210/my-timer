"use client";

import ExpenseList from "./ExpenseList";
import ExpenseFormDialogButton from "./ExpenseFormDialogButton";

export default function HistoryPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">거래 내역</h3>
        <ExpenseFormDialogButton />
      </div>
      <ExpenseList />
    </div>
  );
}
