"use client";

import GoalStatsCards from "./components/GoalStatsCards";
import GoalFilters, { GoalFilter } from "./components/GoalFilters";
import GoalList from "./components/GoalList";
import { openGoalModal } from "./components/GoalModal";
import { useGoalsQuery } from "@/domains/account-book/goal/useGoalsQuery";
import { useState } from "react";
import {
  compareGoalByDueDate,
  compareGoalByPriority,
  compareGoalByProgress,
} from "./helper";
import { useTransactionsQuery } from "@/domains/account-book/transactions/useTransactionsQuery";

export default function GoalsPage() {
  const [filter, setFilter] = useState<GoalFilter>({
    priority: "ALL",
    sortBy: "DUE_DATE",
  });

  const { data: goals = [], isLoading } = useGoalsQuery();
  const { data: transactions = [] } = useTransactionsQuery();

  const filteredGoals = goals.filter((goal) => {
    if (filter.priority !== "ALL") {
      return goal.priority === filter.priority;
    }
    return true;
  });

  const filteredAndSortedGoals = filteredGoals.sort((a, b) => {
    if (filter.sortBy === "DUE_DATE") {
      return compareGoalByDueDate(a, b);
    }

    if (filter.sortBy === "PRIORITY") {
      return compareGoalByPriority(a, b);
    }

    if (filter.sortBy === "PROGRESS") {
      return compareGoalByProgress({ a, b, transactions });
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="h-full grow flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">목표를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">목표 관리</h1>
          <p className="text-gray-600 text-sm mt-1">
            저축 목표를 설정하고 달성 상황을 관리하세요
          </p>
        </div>
        <button
          onClick={() => openGoalModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>새 목표 추가</span>
        </button>
      </div>

      {/* 통계 카드 */}
      <GoalStatsCards goals={goals} />

      {/* 필터 및 정렬 */}
      <GoalFilters
        filter={filter}
        setFilter={setFilter}
        filteredCount={filteredAndSortedGoals.length}
      />

      {/* 목표 목록 */}
      <GoalList goals={filteredAndSortedGoals} />
    </div>
  );
}
