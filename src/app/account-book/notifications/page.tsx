"use client";

import { useState, useEffect } from "react";
import BudgetAlerts from "../budget/_components/BudgetAlerts";
import { BudgetAlert } from "@/types/budget";

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState<BudgetAlert[]>([]);
  const [filter, setFilter] = useState<"all" | "warning" | "danger">("all");

  // 샘플 알림 데이터
  useEffect(() => {
    const sampleAlerts: BudgetAlert[] = [
      {
        id: "alert1",
        type: "danger",
        message: "교통비 예산을 40,000원 초과했습니다.",
        categoryId: "2",
        timestamp: new Date(),
      },
      {
        id: "alert2",
        type: "warning",
        message:
          "식비 예산의 86%를 사용했습니다. 이번 달 남은 기간을 고려해보세요.",
        categoryId: "1",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
      },
      {
        id: "alert3",
        type: "danger",
        message: "쇼핑 카테고리 예산을 15,000원 초과했습니다.",
        categoryId: "3",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
      },
      {
        id: "alert4",
        type: "warning",
        message: "이번 달 전체 예산의 80%를 사용했습니다.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
      },
      {
        id: "alert5",
        type: "warning",
        message: "문화생활 예산의 75%를 사용했습니다.",
        categoryId: "4",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2일 전
      },
    ];

    setTimeout(() => {
      setAlerts(sampleAlerts);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  const handleClearAll = () => {
    setAlerts([]);
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    return alert.type === filter;
  });

  const dangerCount = alerts.filter((alert) => alert.type === "danger").length;
  const warningCount = alerts.filter(
    (alert) => alert.type === "warning"
  ).length;

  if (isLoading) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-600">알림을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">알림</h1>
          <p className="text-gray-600 text-sm mt-1">
            예산 관련 알림 및 경고를 확인하세요
          </p>
        </div>
        {alerts.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            모두 지우기
          </button>
        )}
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {alerts.length}
              </p>
              <p className="text-sm text-gray-600">전체 알림</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
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
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{dangerCount}</p>
              <p className="text-sm text-gray-600">위험 알림</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
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
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {warningCount}
              </p>
              <p className="text-sm text-gray-600">경고 알림</p>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex space-x-1 bg-white rounded-xl p-1 border border-gray-200 animate-fade-in delay-100">
        {[
          { key: "all", label: "전체", count: alerts.length },
          { key: "danger", label: "위험", count: dangerCount },
          { key: "warning", label: "경고", count: warningCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.key
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* 알림 목록 */}
      <div className="animate-fade-in delay-200">
        {filteredAlerts.length > 0 ? (
          <BudgetAlerts
            alerts={filteredAlerts}
            onDismiss={handleDismissAlert}
          />
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {filter === "all"
                ? "알림이 없습니다"
                : filter === "danger"
                ? "위험 알림이 없습니다"
                : "경고 알림이 없습니다"}
            </h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "현재 확인할 알림이 없습니다."
                : `현재 ${
                    filter === "danger" ? "위험" : "경고"
                  } 알림이 없습니다.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
