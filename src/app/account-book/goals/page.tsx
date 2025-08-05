"use client";

import { useState } from "react";
import { Goal, GoalFormData } from "@/types/goal";
import GoalStatsCards from "@/components/goals/GoalStatsCards";
import GoalFilters from "@/components/goals/GoalFilters";
import GoalList from "@/components/goals/GoalList";
import GoalModal from "@/components/goals/GoalModal";
import { useGoals } from "@/components/goals/useGoals";

export default function GoalsPage() {
  const {
    goals,
    isLoading,
    filteredAndSortedGoals,
    filterPriority,
    sortBy,
    addGoal,
    editGoal,
    deleteGoal,
    setFilterPriority,
    setSortBy,
  } = useGoals();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
  };

  const handleSave = (goalData: GoalFormData) => {
    if (editingGoal) {
      editGoal(editingGoal.id, goalData);
    } else {
      addGoal(goalData);
    }
    setShowAddModal(false);
    setEditingGoal(null);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingGoal(null);
  };

  if (isLoading) {
    return (
      <div className="grow flex flex-col items-center justify-center">
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
          onClick={() => setShowAddModal(true)}
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
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredAndSortedGoals.length}
      />

      {/* 목표 목록 */}
      <GoalList
        goals={filteredAndSortedGoals}
        onEdit={handleEditGoal}
        onDelete={deleteGoal}
        onAddNew={() => setShowAddModal(true)}
      />

      {/* 목표 추가/편집 모달 */}
      {(showAddModal || editingGoal) && (
        <GoalModal
          goal={editingGoal}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
