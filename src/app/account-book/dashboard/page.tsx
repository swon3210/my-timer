"use client";

import { useSavingsQuery } from "@/domains/account-book/dashboard/useSavingsQuery";
import { cn } from "@/lib/utils";
import { useGoalsQuery } from "@/domains/account-book/goal/useGoalsQuery";
import { Goal } from "@/app/api/account-books/goals/types";
import Link from "next/link";

export default function AccountBookDashboardPage() {
  const { data: savingsData, isLoading } = useSavingsQuery();

  const { data: goals } = useGoalsQuery();

  const onGoingGoals = goals?.filter((goal) => goal.status === "ON-GOING");
  const completedGoals = goals?.filter((goal) => goal.status === "COMPLETED");

  const savingsGrowth =
    ((savingsData?.thisMonthSavings ?? 0) /
      (savingsData?.lastMonthSavings ?? 0)) *
    100;

  const goalProgress = (goal: Goal) => {
    const progress =
      (goal.targetAmount / (savingsData?.totalSavings ?? 0)) * 100;
    return progress;
  };

  if (isLoading) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">예산 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">목표</h1>
          <p className="text-gray-600 text-sm mt-1">
            이번 달 예산 현황을 확인하고 관리하세요
          </p>
        </div>
        {/* <a
          href="/account-book/notifications"
          className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
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
              d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z"
            />
          </svg>
          <span>알림 2</span>
        </a> */}
      </div>

      {/* 저축 현황 */}
      <div className="animate-fade-in delay-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">저축 현황</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 총 저축금액 카드 */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="size-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold">지금까지 모은 돈</h4>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold mb-2">
                {savingsData?.totalSavings.toLocaleString()}원
              </p>
              <p className="text-green-100 text-sm mb-4">총 저축금액</p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-lg font-bold">
                    {savingsData?.thisMonthSavings.toLocaleString()}원
                  </p>
                  <p className="text-green-100 text-xs">이번 달</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">
                    {(savingsGrowth * 100).toFixed(2)}%
                  </p>
                  <p className="text-green-100 text-xs">증가율</p>
                </div>
              </div>
            </div>
          </div>

          {/* 이번 달 저축 현황 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
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
              <span className="font-medium text-gray-700">
                이번 달 저축 현황
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">이번 달 저축</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {savingsData?.thisMonthSavings.toLocaleString()}원
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    className={cn(
                      "w-4 h-4",
                      savingsGrowth > 0
                        ? "text-green-500"
                        : "text-red-500 rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      savingsGrowth > 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {(savingsGrowth * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">지난 달</p>
                    <p className="text-lg font-bold text-gray-800">
                      {savingsData?.lastMonthSavings.toLocaleString()}원
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">월 평균</p>
                    <p className="text-lg font-bold text-gray-800">
                      {Math.round(
                        (savingsData?.totalSavings ?? 0) / 12
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 목표 관리 */}
      <div className="animate-fade-in delay-150">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">목표 관리</h3>
          <a
            href="/account-book/goals"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>전체보기</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 목표 현황 요약 */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold">나의 목표</h4>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{onGoingGoals?.length}</p>
                <p className="text-blue-100 text-sm">진행중</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{completedGoals?.length}</p>
                <p className="text-blue-100 text-sm">완료</p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="text-center">
                <p className="text-blue-100 text-sm mb-1">전체 목표 달성률</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    ((completedGoals?.length ?? 0) /
                      ((onGoingGoals?.length ?? 0) +
                        (completedGoals?.length ?? 0))) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* 최근 목표들 */}
          <div className="lg:col-span-2 space-y-4">
            {onGoingGoals?.map((goal) => (
              <div
                key={goal.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all hover-lift"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <h5 className="font-bold text-gray-800">
                        {goal.displayName}
                      </h5>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {goal.description}
                        </span>
                        <span>마감: {goal.endAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">
                      ₩{savingsData?.totalSavings.toLocaleString()} / ₩
                      {goal.targetAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {goalProgress(goal)}% 달성
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${goalProgress(goal)}%` }}
                  ></div>
                </div>
              </div>
            ))}

            <a
              href="/account-book/goals"
              className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              모든 목표 보기
            </a>
          </div>
        </div>
      </div>

      {/* 관리 메뉴 */}
      <div className="animate-fade-in delay-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">관리</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/account-book/budget/weekly"
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all hover-lift group text-left block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors"
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
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              주간 예산 관리
            </h4>
            <p className="text-gray-600 text-sm mb-3">
              카테고리별 주간 예산을 설정하고 관리하세요
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600 font-medium">이번 주 예산</span>
              <span className="text-gray-800 font-bold">₩1,000,000</span>
            </div>
          </Link>

          <Link
            href="/account-book/budget/monthly"
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all hover-lift group text-left block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600"
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
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
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
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              월간 예산 관리
            </h4>
            <p className="text-gray-600 text-sm mb-3">
              카테고리별 월간 예산을 설정하고 관리하세요
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600 font-medium">이번 달 예산</span>
              <span className="text-gray-800 font-bold">₩2,000,000</span>
            </div>
          </Link>

          <Link
            href="/account-book/budget/yearly"
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all hover-lift group text-left block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg
                  className="w-6 h-6 text-purple-600"
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
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors"
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
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              연간 예산 관리
            </h4>
            <p className="text-gray-600 text-sm mb-3">
              장기적인 재정 계획을 위한 연간 예산을 설정하세요
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-600 font-medium">올해 예산</span>
              <span className="text-gray-800 font-bold">₩24,000,000</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
