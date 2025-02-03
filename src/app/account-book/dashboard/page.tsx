"use client";

import ExpenseSummary from "./ExpenseSummary";
import DateManager from "./DateManager";

export default function AccountBookPage() {
  return (
    <div className="flex flex-col gap-4 pt-8">
      <div className="flex justify-center">
        <DateManager />
      </div>
      <ExpenseSummary />
    </div>
  );
}
