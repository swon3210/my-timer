"use client";

import { useState, useEffect } from "react";
import BudgetOverview from "@/components/budget/BudgetOverview";
import CategoryBudgetList from "@/components/budget/CategoryBudgetList";
import { BudgetStatus } from "@/types/budget";

export default function MonthlyBudgetPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  // 샘플 데이터 - 실제로는 API에서 불러올 데이터
  useEffect(() => {
    const sampleBudgetStatus: BudgetStatus = {
      totalBudget: 2000000,
      totalSpent: 1650000,
      remainingBudget: 350000,
      progressPercentage: 82.5,
      isOverBudget: false,
      categories: [
        {
          id: "1",
          name: "식비",
          allocated: 600000,
          spent: 520000,
          remaining: 80000,
          percentage: 86.7,
          isOverBudget: false,
          color: "#10B981",
        },
        {
          id: "2",
          name: "교통비",
          allocated: 200000,
          spent: 240000,
          remaining: -40000,
          percentage: 120,
          isOverBudget: true,
          color: "#EF4444",
        },
        {
          id: "3",
          name: "쇼핑",
          allocated: 400000,
          spent: 350000,
          remaining: 50000,
          percentage: 87.5,
          isOverBudget: false,
          color: "#8B5CF6",
        },
        {
          id: "4",
          name: "문화생활",
          allocated: 300000,
          spent: 180000,
          remaining: 120000,
          percentage: 60,
          isOverBudget: false,
          color: "#F59E0B",
        },
        {
          id: "5",
          name: "기타",
          allocated: 500000,
          spent: 360000,
          remaining: 140000,
          percentage: 72,
          isOverBudget: false,
          color: "#3B82F6",
        },
      ],
    };

    setTimeout(() => {
      setBudgetStatus(sampleBudgetStatus);
      setIsLoading(false);
    }, 500);
  }, [selectedMonth, selectedYear]);

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">월간 예산 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!budgetStatus) {
    return (
      <div className="grow flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-blue-600"
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            월간 예산을 설정해보세요
          </h2>
          <p className="text-gray-600 mb-6">
            {months[selectedMonth]} {selectedYear}년 예산을 설정하여 지출을
            체계적으로 관리할 수 있습니다.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            예산 설정하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">월간 예산 관리</h1>
          <p className="text-gray-600 text-sm mt-1">
            월별 예산을 체계적으로 설정하고 관리하세요
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

      {/* 월 선택기 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 animate-fade-in">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousMonth}
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
              {selectedYear}년 {months[selectedMonth]}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedMonth === new Date().getMonth() &&
              selectedYear === new Date().getFullYear()
                ? "현재 월"
                : "과거/미래 월"}
            </p>
          </div>

          <button
            onClick={handleNextMonth}
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

      {/* 예산 개요 */}
      <div className="animate-fade-in delay-100">
        <BudgetOverview budgetStatus={budgetStatus} />
      </div>

      {/* 카테고리별 예산 현황 */}
      <div className="animate-fade-in delay-200">
        <CategoryBudgetList categories={budgetStatus.categories} />
      </div>

      {/* 월간 관리 액션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">예산 수정</p>
              <p className="text-sm text-gray-600">월간 예산 조정</p>
            </div>
          </div>
        </button>

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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">지출 추가</p>
              <p className="text-sm text-gray-600">새로운 지출 기록</p>
            </div>
          </div>
        </button>

        <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">월간 리포트</p>
              <p className="text-sm text-gray-600">지출 분석 보기</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
