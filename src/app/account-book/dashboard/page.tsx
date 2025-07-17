"use client";

import { useSavingsQuery } from "@/domains/account-book/dashboard/useSavingsQuery";
import { useGoalsQuery } from "@/domains/account-book/goal/useGoalsQuery";
import SavingSection from "./_components/SavingSection";
import Menus from "./_components/Menus";
import GoalSection from "./_components/GoalSection";

export default function AccountBookDashboardPage() {
  const { isLoading: isSavingsLoading } = useSavingsQuery();

  const { isLoading: isGoalsLoading } = useGoalsQuery();

  if (isSavingsLoading || isGoalsLoading) {
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
      </div>

      {/* 저축 현황 */}
      <SavingSection />

      <GoalSection />

      {/* 관리 메뉴 */}
      <Menus />
    </div>
  );
}
