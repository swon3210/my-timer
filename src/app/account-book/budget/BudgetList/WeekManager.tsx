"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import dayjs from "dayjs";
import useDateAtom from "../_atom/useDateAtom";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

function getWeekOfMonth(date: dayjs.Dayjs): number {
  const startOfMonth = date.startOf("month");
  const firstDayWeekday = startOfMonth.day();
  const offset = firstDayWeekday === 0 ? 0 : 7 - firstDayWeekday;
  const adjustedStart = startOfMonth.add(offset, "day");

  return Math.ceil(date.diff(adjustedStart, "day") / 7) + 1;
}

export default function WeekManager() {
  const { date, setDate } = useDateAtom();

  return (
    <div className="flex space-x-4 items-center">
      <button
        type="button"
        onClick={() =>
          setDate(dayjs(date).subtract(1, "week").startOf("week").toDate())
        }
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      <h1 className="text-2xl font-bold">
        {getWeekOfMonth(dayjs(date))}
        주차
      </h1>

      {dayjs(date).isBefore(dayjs(), "week") && (
        <button
          type="button"
          onClick={() =>
            setDate(dayjs(date).add(1, "week").startOf("week").toDate())
          }
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
