"use client";

import { useState } from "react";
import ExpenseSummary from "./_components/ExpenseSummary";
import ExpenseTabs from "./_components/ExpenseTabs";
import ExpenseList from "./_components/ExpenseList/ExpenseList";
import { TabType } from "./_components/ExpenseTabs/ExpenseTabs";

export default function AccountBookHomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");

  return (
    <div className="grow flex flex-col gap-6 pt-4">
      <ExpenseSummary />
      <div className="flex flex-col grow rounded-t-3xl overflow-hidden bg-mint-light p-5 gap-6">
        <div className="flex flex-col gap-4">
          <ExpenseTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <ExpenseList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
