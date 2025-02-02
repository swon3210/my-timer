"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import dayjs from "dayjs";
import useDateAtom from "./_atom/useDateAtom";

export default function MonthManager() {
  const { date, setDate } = useDateAtom();

  const handlePrevMonthIconClick = () => {
    setDate(dayjs(date).date(1).subtract(1, "month").toDate());
  };

  const handleNextMonthIconClick = () => {
    setDate(dayjs(date).date(1).add(1, "month").toDate());
  };

  return (
    <div className="flex space-x-4 items-center">
      <button
        type="button"
        onClick={handlePrevMonthIconClick}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      <h1 className="text-2xl font-bold">
        {dayjs(date).format("YYYY년 MM월")}
      </h1>

      {dayjs(date).isBefore(dayjs(), "month") ? (
        <button
          type="button"
          onClick={handleNextMonthIconClick}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      ) : (
        <div className="w-8" />
      )}
    </div>
  );
}
