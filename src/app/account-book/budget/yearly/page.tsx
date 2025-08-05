"use client";

import { useState } from "react";
import BudgetOverview from "@/components/budget/BudgetOverview";
import CategoryBudgetList from "@/components/budget/CategoryBudgetList";
import BudgetCreateModal from "@/components/budget/BudgetCreateModal";

import {
  useBudgetsByPeriod,
  useBudgetStatus,
  useCreateBudget,
  useUpdateBudget,
  useDeleteBudget,
} from "@/hooks/useBudget";
import {
  CreateBudgetRequest,
  UpdateBudgetRequest,
} from "@/services/budgetService";

export default function YearlyBudgetPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] =
    useState<CreateBudgetRequest | null>(null);

  // 데이터 조회
  const {
    data: budgets = [],
    isLoading,
    refetch,
  } = useBudgetsByPeriod({
    period: "yearly",
    year: selectedYear,
  });

  const currentBudget = budgets.length > 0 ? budgets[0] : null;
  const { data: budgetStatus } = useBudgetStatus(currentBudget);

  // 뮤테이션
  const createBudgetMutation = useCreateBudget();
  const updateBudgetMutation = useUpdateBudget();
  const deleteBudgetMutation = useDeleteBudget();

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const getCurrentQuarter = () => {
    const currentMonth = new Date().getMonth();
    if (currentMonth < 3) return "1분기";
    if (currentMonth < 6) return "2분기";
    if (currentMonth < 9) return "3분기";
    return "4분기";
  };

  const handleCreateBudget = async (budgetData: CreateBudgetRequest) => {
    try {
      await createBudgetMutation.mutateAsync(budgetData);
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error("예산 생성 실패:", error);
    }
  };

  const handleUpdateBudget = async (budgetData: CreateBudgetRequest) => {
    if (!editingBudget) return;

    try {
      const updateData: UpdateBudgetRequest = {
        ...budgetData,
        id: editingBudget.id,
      };
      await updateBudgetMutation.mutateAsync(updateData);
      setIsModalOpen(false);
      setEditingBudget(null);
      refetch();
    } catch (error) {
      console.error("예산 수정 실패:", error);
    }
  };

  const handleDeleteBudget = async () => {
    if (!currentBudget) return;

    if (confirm("정말로 이 예산을 삭제하시겠습니까?")) {
      try {
        await deleteBudgetMutation.mutateAsync(currentBudget.id);
        refetch();
      } catch (error) {
        console.error("예산 삭제 실패:", error);
      }
    }
  };

  const handleEditBudget = () => {
    setEditingBudget(currentBudget);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">연간 예산 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!currentBudget || !budgetStatus) {
    return (
      <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">연간 예산 관리</h1>
            <p className="text-gray-600 text-sm mt-1">
              연간 예산을 통해 장기적인 재정 계획을 관리하세요
            </p>
          </div>
          <a
            href="/account-book/dashboard"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>대시보드로</span>
          </a>
        </div>

        {/* 연도 선택기 */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousYear}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedYear}년
              </h2>
              <p className="text-sm text-gray-600">
                {selectedYear === new Date().getFullYear()
                  ? `현재 연도 · ${getCurrentQuarter()}`
                  : selectedYear > new Date().getFullYear()
                  ? "미래 연도"
                  : "과거 연도"}
              </p>
            </div>

            <button
              onClick={handleNextYear}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 예산 없음 상태 */}
        <div className="grow flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              연간 예산을 설정해보세요
            </h2>
            <p className="text-gray-600 mb-6">
              {selectedYear}년 전체 예산을 설정하여 장기적인 재정 계획을
              세워보세요.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              연간 예산 설정하기
            </button>
          </div>
        </div>

        {/* 예산 생성 모달 */}
        <BudgetCreateModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBudget(null);
          }}
          onSave={editingBudget ? handleUpdateBudget : handleCreateBudget}
          period="yearly"
          selectedYear={selectedYear}
          initialBudget={editingBudget}
        />
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">연간 예산 관리</h1>
          <p className="text-gray-600 text-sm mt-1">
            연간 예산을 통해 장기적인 재정 계획을 관리하세요
          </p>
        </div>
        <a
          href="/account-book/dashboard"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>대시보드로</span>
        </a>
      </div>

      {/* 연도 선택기 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 animate-fade-in">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousYear}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedYear}년
            </h2>
            <p className="text-sm text-gray-600">
              {selectedYear === new Date().getFullYear()
                ? `현재 연도 · ${getCurrentQuarter()}`
                : selectedYear > new Date().getFullYear()
                ? "미래 연도"
                : "과거 연도"}
            </p>
          </div>

          <button
            onClick={handleNextYear}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 예산 개요 (연간 데이터) */}
      <div className="animate-fade-in delay-200">
        <BudgetOverview budgetStatus={budgetStatus} />
      </div>

      {/* 카테고리별 예산 현황 (연간 데이터) */}
      <div className="animate-fade-in delay-300">
        <CategoryBudgetList categories={budgetStatus.categories} />
      </div>

      {/* 연간 관리 액션 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <button
          onClick={handleEditBudget}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">예산 수정</p>
              <p className="text-sm text-gray-600">연간 예산 조정</p>
            </div>
          </div>
        </button>

        <button
          onClick={handleDeleteBudget}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">예산 삭제</p>
              <p className="text-sm text-gray-600">예산 제거</p>
            </div>
          </div>
        </button>

        <a
          href="/account-book/budget/monthly"
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group block"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">월간 보기</p>
              <p className="text-sm text-gray-600">월별 세부 관리</p>
            </div>
          </div>
        </a>

        <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">연간 리포트</p>
              <p className="text-sm text-gray-600">전체 연도 분석</p>
            </div>
          </div>
        </button>
      </div>

      {/* 예산 수정 모달 */}
      <BudgetCreateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        onSave={editingBudget ? handleUpdateBudget : handleCreateBudget}
        period="yearly"
        selectedYear={selectedYear}
        initialBudget={editingBudget}
      />
    </div>
  );
}
