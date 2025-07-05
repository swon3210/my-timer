"use client";

import { BudgetAlert } from "@/types/budget";
import { useState } from "react";

interface BudgetAlertsProps {
  alerts: BudgetAlert[];
  onDismiss: (alertId: string) => void;
}

export default function BudgetAlerts({ alerts, onDismiss }: BudgetAlertsProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(
    new Set()
  );

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts((prev) => new Set(Array.from(prev).concat(alertId)));
    setTimeout(() => onDismiss(alertId), 300); // 애니메이션 후 제거
  };

  const visibleAlerts = alerts.filter(
    (alert) => !dismissedAlerts.has(alert.id)
  );

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`transform transition-all duration-300 ease-out ${
            dismissedAlerts.has(alert.id)
              ? "opacity-0 scale-95 -translate-y-2"
              : "opacity-100 scale-100 translate-y-0"
          } ${
            alert.type === "danger"
              ? "bg-red-50 border border-red-200"
              : "bg-yellow-50 border border-yellow-200"
          } rounded-xl p-4 shadow-sm`}
        >
          <div className="flex items-start space-x-3">
            {/* 아이콘 */}
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                alert.type === "danger" ? "bg-red-100" : "bg-yellow-100"
              }`}
            >
              {alert.type === "danger" ? (
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>

            {/* 메시지 */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  alert.type === "danger" ? "text-red-800" : "text-yellow-800"
                }`}
              >
                {alert.type === "danger" ? "예산 초과 알림" : "예산 경고"}
              </p>
              <p
                className={`text-sm mt-1 ${
                  alert.type === "danger" ? "text-red-700" : "text-yellow-700"
                }`}
              >
                {alert.message}
              </p>
              <p
                className={`text-xs mt-2 ${
                  alert.type === "danger" ? "text-red-600" : "text-yellow-600"
                }`}
              >
                {alert.timestamp.toLocaleDateString("ko-KR", {
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => handleDismiss(alert.id)}
              className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                alert.type === "danger"
                  ? "hover:bg-red-100 text-red-500"
                  : "hover:bg-yellow-100 text-yellow-500"
              }`}
            >
              <svg
                className="w-4 h-4"
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
            </button>
          </div>

          {/* 액션 버튼 (필요한 경우) */}
          {alert.type === "danger" && (
            <div className="mt-3 flex space-x-2">
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-full font-medium hover:bg-red-700 transition-colors">
                지출 내역 확인
              </button>
              <button className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium hover:bg-red-200 transition-colors">
                예산 수정
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
