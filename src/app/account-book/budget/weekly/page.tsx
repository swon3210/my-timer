"use client";

import { useState } from "react";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { Header, WeekPeriodSelector } from "./_components";
import BudgetList from "../_components/BudgetList/BudgetList";
import dayjs from "dayjs";
import EmptyBudget from "../_components/EmptyBudget";

export default function WeeklyBudgetPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedWeekPeriod, setSelectedWeekPeriod] = useState<
    [number, number]
  >(() => {
    const today = dayjs();

    const mondayOfThisWeek = dayjs().day(0);
    const sundayOfThisWeek = dayjs().day(6);

    // 이번주의 월요일이 이전달인 경우 이번달의 첫날을 시작일로 설정
    const startDate =
      mondayOfThisWeek.month() < selectedMonth
        ? mondayOfThisWeek
        : mondayOfThisWeek.startOf("month");

    // 이번주의 일요일이 다음달인 경우 이번달 마지막 날을 종료일로 설정
    const endDate =
      sundayOfThisWeek.month() > today.month()
        ? sundayOfThisWeek.endOf("month")
        : sundayOfThisWeek;

    return [startDate.date(), endDate.date()];
  });

  const { data: budgets = [], isLoading } = useBudgetsQuery();

  const handlePreviousWeekPeriod = () => {
    const [start, end] = selectedWeekPeriod;

    if (start === 1) {
      const newMonth = selectedMonth - 1;

      if (newMonth < 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(newMonth);
      }

      const endOfPreviousMonth = dayjs().month(newMonth).endOf("month").date();

      setSelectedWeekPeriod([endOfPreviousMonth - 6, endOfPreviousMonth]);
    }

    if (start - 7 < 1) {
      setSelectedWeekPeriod([
        dayjs().month(selectedMonth).startOf("month").date(),
        start - 1,
      ]);
    } else {
      setSelectedWeekPeriod([start - 7, end - 7]);
    }
  };

  const handleNextWeekPeriod = () => {
    const [start, end] = selectedWeekPeriod;

    if (end === dayjs().month(selectedMonth).endOf("month").date()) {
      const newMonth = selectedMonth + 1;

      if (newMonth > 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(newMonth);
      }

      const startOfNextMonth = dayjs().month(newMonth).startOf("month").date();

      setSelectedWeekPeriod([startOfNextMonth, startOfNextMonth + 6]);
    }

    if (end + 7 > dayjs().month(selectedMonth).endOf("month").date()) {
      setSelectedWeekPeriod([
        end + 1,
        dayjs().month(selectedMonth).endOf("month").date(),
      ]);
    } else {
      setSelectedWeekPeriod([start + 7, end + 7]);
    }
  };

  if (isLoading) {
    return (
      <div className="grow h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-600">주간 예산 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <Header
        title="주간 예산 관리"
        description="주간 예산을 체계적으로 설정하고 관리하세요"
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedWeekPeriod={selectedWeekPeriod}
      />

      <WeekPeriodSelector
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedWeekPeriod={selectedWeekPeriod}
        onPreviousWeekPeriod={handlePreviousWeekPeriod}
        onNextWeekPeriod={handleNextWeekPeriod}
      />

      {/* 예산 목록 또는 빈 상태 */}
      {budgets.length === 0 ? (
        <EmptyBudget
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedWeekPeriod={selectedWeekPeriod}
        />
      ) : (
        <BudgetList
          budgets={budgets}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedWeekPeriod={selectedWeekPeriod}
        />
      )}
    </div>
  );
}
