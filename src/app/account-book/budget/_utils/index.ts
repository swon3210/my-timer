import dayjs from "dayjs";

export function getWeekOfMonth(date: dayjs.Dayjs): number {
  const startOfMonth = date.startOf("month");
  const firstDayWeekday = startOfMonth.day();
  const offset = firstDayWeekday === 0 ? 0 : 7 - firstDayWeekday;
  const adjustedStart = startOfMonth.add(offset, "day");

  return Math.ceil(date.diff(adjustedStart, "day") / 7) + 1;
}
