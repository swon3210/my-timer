"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import dayjs from "dayjs";
import useDateAtom from "./_atom/useDateAtom";
import useSubTab from "./useSubTab";
import { getWeekOfMonth } from "../budget/_utils";

const getCurrentDateString = (
  date: Date,
  subTab: "weekly" | "monthly" | "yearly"
) => {
  if (subTab === "weekly") {
    return dayjs(date)
      .format("MM월")
      .concat(` ${getWeekOfMonth(dayjs(date))}주차`);
  }

  if (subTab === "monthly") {
    return dayjs(date).format("YYYY년 MM월");
  }

  return dayjs(date).format("YYYY년");
};

const isNextDateAvailable = (
  date: Date,
  subTab: "weekly" | "monthly" | "yearly"
) => {
  if (subTab === "weekly") {
    return dayjs(date).isBefore(dayjs(), "week");
  }

  if (subTab === "monthly") {
    return dayjs(date).isBefore(dayjs(), "month");
  }

  return dayjs(date).isBefore(dayjs(), "year");
};

export default function DateManager() {
  const { subTab } = useSubTab();

  const { date, setDate } = useDateAtom();

  const handlePrevDateIconClick = () => {
    if (subTab === "weekly") {
      setDate(dayjs(date).subtract(1, "week").toDate());
    }

    if (subTab === "monthly") {
      setDate(dayjs(date).date(1).subtract(1, "month").toDate());
    }

    if (subTab === "yearly") {
      setDate(dayjs(date).subtract(1, "year").toDate());
    }
  };

  const handleNextDateIconClick = () => {
    if (subTab === "weekly") {
      setDate(dayjs(date).add(1, "week").toDate());
    }

    if (subTab === "monthly") {
      setDate(dayjs(date).date(1).add(1, "month").toDate());
    }

    if (subTab === "yearly") {
      setDate(dayjs(date).add(1, "year").toDate());
    }
  };

  return (
    <div className="flex space-x-4 items-center">
      <button
        type="button"
        onClick={handlePrevDateIconClick}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      <h1 className="text-2xl font-bold">
        {getCurrentDateString(date, subTab)}
      </h1>

      {isNextDateAvailable(date, subTab) ? (
        <button
          type="button"
          onClick={handleNextDateIconClick}
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
