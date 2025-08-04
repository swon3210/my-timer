"use client";

import { useState } from "react";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { Header, YearSelector } from "./_components";
import BudgetList from "../_components/BudgetList/BudgetList";
import EmptyBudget from "../_components/EmptyBudget";

export default function MonthlyBudgetPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: budgets = [], isLoading } = useBudgetsQuery();

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  if (isLoading) {
    return (
      <div className="grow h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">월간 예산 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <Header
        title="연간 예산 관리"
        description="연간 예산을 체계적으로 설정하고 관리하세요"
        selectedYear={selectedYear}
      />

      {/* 월 선택기 */}
      <YearSelector
        selectedYear={selectedYear}
        onPreviousYear={handlePreviousYear}
        onNextYear={handleNextYear}
      />

      {/* 예산 목록 또는 빈 상태 */}
      {budgets.length === 0 ? (
        <EmptyBudget selectedYear={selectedYear} />
      ) : (
        <BudgetList budgets={budgets} selectedYear={selectedYear} />
      )}
    </div>
  );
}
