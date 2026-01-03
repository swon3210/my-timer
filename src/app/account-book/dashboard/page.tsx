"use client";

import { useSavingsQuery } from "@/domains/account-book/dashboard/useSavingsQuery";
import { useGoalsQuery } from "@/domains/account-book/goal/useGoalsQuery";
import SavingSection from "./_components/SavingSection";
import Menus from "./_components/Menus";
import GoalSection from "./_components/GoalSection";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Spinner } from "@/components/ui/spinner";

export default function AccountBookDashboardPage() {
  const { isLoading: isSavingsLoading } = useSavingsQuery();

  const { isLoading: isGoalsLoading } = useGoalsQuery();

  if (isSavingsLoading || isGoalsLoading) {
    return (
      <div className="grow flex flex-col items-center justify-center gap-4">
        <Spinner size={48} />
        <p className="text-body-sm text-muted-foreground">예산 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col min-h-screen bg-muted">
      <PageHeader
        title="목표"
        subtitle="이번 달 예산 현황을 확인하고 관리하세요"
        border
      />

      <Container className="py-6 space-y-6">
        {/* 저축 현황 */}
        <SavingSection />

        <GoalSection />

        {/* 관리 메뉴 */}
        <Menus />
      </Container>
    </div>
  );
}
