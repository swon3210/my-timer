import { useState, useEffect } from "react";
import { Goal, Priority, GoalFormData } from "@/types/goal";
import { sampleGoals } from "./sampleData";
import { filterAndSortGoals, createNewGoal, updateGoal } from "./utils";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "progress">(
    "dueDate"
  );

  // 초기 데이터 로드
  useEffect(() => {
    setTimeout(() => {
      setGoals(sampleGoals);
      setIsLoading(false);
    }, 500);
  }, []);

  // 필터링된 목표 계산
  const filteredAndSortedGoals = filterAndSortGoals(
    goals,
    filterPriority,
    sortBy
  );

  // 목표 추가
  const addGoal = (goalData: GoalFormData) => {
    const newGoal = createNewGoal(goalData);
    setGoals([...goals, newGoal]);
  };

  // 목표 수정
  const editGoal = (goalId: number, goalData: GoalFormData) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId ? updateGoal(goal, goalData) : goal
      )
    );
  };

  // 목표 삭제
  const deleteGoal = (goalId: number) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  return {
    // 상태
    goals,
    isLoading,
    filteredAndSortedGoals,
    filterPriority,
    sortBy,

    // 액션
    addGoal,
    editGoal,
    deleteGoal,
    setFilterPriority,
    setSortBy,
  };
}
