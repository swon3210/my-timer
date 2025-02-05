import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import dayjs from "dayjs";
import useDateAtom from "../_atom/useDateAtom";
import { getWeekOfMonth } from "../_utils";

function getWeeksInMonth(date: dayjs.Dayjs) {
  const start = date.startOf("month").startOf("week");
  const end = date.endOf("month").endOf("week");
  return Math.ceil(end.diff(start, "week", true));
}

export default function MonthManager() {
  const { date, setDate } = useDateAtom();

  const handlePrevMonthIconClick = () => {
    const weeksInMonth = getWeeksInMonth(
      dayjs(date).month(dayjs(date).month() - 1)
    );

    const targetDate = dayjs(date)
      .subtract(weeksInMonth - 1, "week")
      .startOf("week")
      .toDate();

    setDate(targetDate);

    if (getWeekOfMonth(dayjs(targetDate)) !== 1) {
      setDate(dayjs(targetDate).subtract(1, "week").startOf("week").toDate());
    } else {
      setDate(targetDate);
    }
  };

  const handleNextMonthIconClick = () => {
    const weeksInMonth = getWeeksInMonth(dayjs(date));

    const targetDate = dayjs(date)
      .add(weeksInMonth - 1, "week")
      .startOf("week")
      .toDate();

    if (getWeekOfMonth(dayjs(targetDate)) !== 1) {
      setDate(dayjs(targetDate).add(1, "week").startOf("week").toDate());
    } else {
      setDate(targetDate);
    }
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

      {dayjs(date).isBefore(dayjs(), "month") && (
        <button
          type="button"
          onClick={handleNextMonthIconClick}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
