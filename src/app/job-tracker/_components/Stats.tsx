"use client";

import { JobStats } from "@/types/job";

interface StatsProps {
  stats: JobStats;
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {stats.totalDays}일
          </div>
          <div className="text-xs text-gray-600">이번 달 근무일</div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {stats.totalHours}시간
          </div>
          <div className="text-xs text-gray-600">이번 달 근무시간</div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {stats.averageHours}시간
          </div>
          <div className="text-xs text-gray-600">평균 근무시간</div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {stats.currentStreak}일
          </div>
          <div className="text-xs text-gray-600">이번 달 연속</div>
        </div>
      </div>
    </div>
  );
}
