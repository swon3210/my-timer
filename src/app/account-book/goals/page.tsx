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
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";

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
      <div className="h-full grow flex flex-col items-center justify-center gap-4">
        <Spinner size={48} />
        <p className="text-body-sm text-muted-foreground">목표를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col min-h-screen bg-muted">
      <PageHeader
        title="목표 관리"
        subtitle="저축 목표를 설정하고 달성 상황을 관리하세요"
        border
        rightSlot={
          <Button onClick={() => openGoalModal()}>
            <Plus className="h-4 w-4" />
            새 목표 추가
          </Button>
        }
      />

      <Container className="py-6 space-y-6">
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
      </Container>
    </div>
  );
}
