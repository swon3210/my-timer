"use client";

import { JobRecord as JobRecordType } from "@/types/job";

interface JobRecordProps {
  record: JobRecordType;
  isSelectedDate?: boolean;
}

export default function JobRecord({
  record,
  isSelectedDate = false,
}: JobRecordProps) {
  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  return (
    <>
      {/* 선택된 날짜 표시 */}
      {isSelectedDate && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-center">
            <div className="text-sm text-blue-600 mb-1">선택된 날짜</div>
            <div className="text-base font-semibold text-blue-800">
              {formatSelectedDate(record.date)}
            </div>
          </div>
        </div>
      )}

      {/* 기록 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isSelectedDate ? "선택된 날짜 기록" : "오늘 기록"}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">출근 시간</div>
            <div className="text-lg font-bold text-blue-600">
              {record.checkIn || "-"}
            </div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">퇴근 시간</div>
            <div className="text-lg font-bold text-red-600">
              {record.checkOut || "-"}
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">근무 시간</div>
            <div className="text-lg font-bold text-green-600">
              {record.totalHours ? `${record.totalHours}시간` : "-"}
            </div>
          </div>
        </div>
        {record.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">메모</div>
            <div className="text-sm text-gray-800">{record.notes}</div>
          </div>
        )}
      </div>
    </>
  );
}
