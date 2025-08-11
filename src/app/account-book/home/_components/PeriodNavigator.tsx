"use client";

import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import useDateAtom from "../_atom/useDateAtom";
import { TabType } from "./ExpenseTabs/ExpenseTabs";

type Props = {
  activeTab: TabType;
};

function getLabelByTab(date: Date, activeTab: TabType): string {
  const base = dayjs(date);

  if (activeTab === "yearly") {
    return base.format("YYYY년");
  }

  if (activeTab === "monthly") {
    return base.format("YYYY년 M월");
  }

  const start = base.startOf("week");
  const end = base.endOf("week");
  return `${start.format("M월 D일")} - ${end.format("M월 D일")}`;
}

export default function PeriodNavigator({ activeTab }: Props) {
  const { date, setDate } = useDateAtom();

  const handlePrev = () => {
    const unit =
      activeTab === "yearly"
        ? "year"
        : activeTab === "monthly"
        ? "month"
        : "week";
    setDate(dayjs(date).subtract(1, unit).startOf(unit).toDate());
  };

  const handleNext = () => {
    const unit =
      activeTab === "yearly"
        ? "year"
        : activeTab === "monthly"
        ? "month"
        : "week";
    setDate(dayjs(date).add(1, unit).startOf(unit).toDate());
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-2 shadow-sm">
      <Button variant="ghost" size="sm" onClick={handlePrev}>
        ◀
      </Button>
      <div className="text-sm font-medium text-gray-700">
        {getLabelByTab(date, activeTab)}
      </div>
      <Button variant="ghost" size="sm" onClick={handleNext}>
        ▶
      </Button>
    </div>
  );
}
