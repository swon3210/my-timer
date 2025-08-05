"use client";

import { useState } from "react";
import { JobRecord } from "@/types/job";

interface CalendarProps {
  currentDate: Date;
  todayRecord: JobRecord | null;
  jobRecords: JobRecord[]; // 추가: 모든 근무 기록
  selectedDate: Date | null; // 추가: 현재 선택된 날짜
  onDateClick: (date: Date) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function Calendar({
  currentDate,
  todayRecord,
  jobRecords, // 추가
  selectedDate, // 추가
  onDateClick,
  isExpanded = false,
  onToggleExpand,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = new Date(year, month, 1).getDay();
    return { daysInMonth, startingDay };
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  // 선택된 날짜인지 확인하는 함수
  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  // 근무 기록이 있는 날짜인지 확인하는 함수
  const hasWorkRecord = (day: number) => {
    const dateString = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toLocaleDateString("en-CA"); // YYYY-MM-DD 형식으로 로컬 시간 사용

    return jobRecords.some(
      (record) => record.id === dateString && record.isComplete
    );
  };

  const isWorkingDay = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5;
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const monthNames = [
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

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm transition-all duration-300 ${
        isExpanded
          ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl h-auto max-h-[90vh] z-50 p-6 overflow-y-auto"
          : "p-4"
      }`}
    >
      {/* 달력 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 bg-white"
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
        <h3
          className={`font-bold text-gray-800 ${
            isExpanded ? "text-xl" : "text-lg"
          }`}
        >
          {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 bg-white"
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

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`text-center py-2 text-sm font-medium ${
              index === 0
                ? "text-red-500"
                : index === 6
                ? "text-blue-500"
                : "text-gray-600"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {/* 빈 칸들 */}
        {Array.from({ length: startingDay }, (_, index) => (
          <div
            key={`empty-${index}`}
            className={`${isExpanded ? "h-16" : "h-10"}`}
          ></div>
        ))}

        {/* 날짜들 */}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const isCurrentDay = isToday(day);
          const isSelected = isSelectedDate(day);
          const isWorkDay = isWorkingDay(day);
          const hasWork = hasWorkRecord(day);

          return (
            <button
              key={day}
              onClick={() =>
                onDateClick(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  )
                )
              }
              className={`
                ${
                  isExpanded ? "h-16" : "h-10"
                } rounded-lg text-sm font-medium transition-all
                ${
                  isCurrentDay
                    ? "bg-blue-500 text-white shadow-md"
                    : isSelected
                    ? "bg-purple-500 text-white shadow-md"
                    : hasWork
                    ? "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300"
                    : isWorkDay
                    ? "hover:bg-blue-50 text-gray-800"
                    : "text-gray-400"
                }
                ${
                  isCurrentDay && todayRecord?.isComplete
                    ? "ring-2 ring-green-300"
                    : ""
                }
              `}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className={isExpanded ? "text-base" : "text-sm"}>
                  {day}
                </span>
                {(isCurrentDay && todayRecord?.isComplete) || hasWork ? (
                  <div
                    className={`${
                      isExpanded ? "w-2 h-2" : "w-1 h-1"
                    } bg-green-500 rounded-full mt-1`}
                  ></div>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>오늘</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>선택된 날짜</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>근무 기록</span>
          </div>
        </div>
      </div>

      {/* 확대/축소 버튼 */}
      {onToggleExpand && (
        <button
          onClick={onToggleExpand}
          className="absolute bottom-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {isExpanded ? (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
