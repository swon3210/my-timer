"use client";

interface WeekPeriodSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  selectedWeekPeriod: [number, number];
  onPreviousWeekPeriod: () => void;
  onNextWeekPeriod: () => void;
}

export default function WeekPeriodSelector({
  selectedYear,
  selectedMonth,
  selectedWeekPeriod,
  onPreviousWeekPeriod,
  onNextWeekPeriod,
}: WeekPeriodSelectorProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousWeekPeriod}
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
            {selectedYear}년 {selectedMonth}월
          </h2>
          <h3 className="text-lg text-gray-600">
            {selectedWeekPeriod[0]}일 - {selectedWeekPeriod[1]}일
          </h3>
        </div>

        <button
          onClick={onNextWeekPeriod}
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
  );
}
