"use client";

import { BudgetStatus } from "@/types/budget";
import { formatCurrency } from "@/utils/format";

interface BudgetOverviewProps {
  budgetStatus: BudgetStatus;
}

export default function BudgetOverview({ budgetStatus }: BudgetOverviewProps) {
  const {
    totalBudget,
    totalSpent,
    remainingBudget,
    progressPercentage,
    isOverBudget,
  } = budgetStatus;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">이번 달 예산</h2>
          <p className="text-blue-100 text-sm">
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">{formatCurrency(totalBudget)}</p>
          <p className="text-blue-100 text-sm">총 예산</p>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>사용한 금액</span>
          <span>{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ease-out ${
              isOverBudget
                ? "bg-red-400"
                : progressPercentage > 80
                ? "bg-yellow-400"
                : "bg-green-400"
            }`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* 금액 정보 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-blue-100 text-sm mb-1">사용 금액</p>
          <p className="text-xl font-bold">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-blue-100 text-sm mb-1">
            {isOverBudget ? "초과 금액" : "남은 금액"}
          </p>
          <p
            className={`text-xl font-bold ${
              isOverBudget ? "text-red-300" : "text-green-300"
            }`}
          >
            {formatCurrency(Math.abs(remainingBudget))}
          </p>
        </div>
      </div>

      {isOverBudget && (
        <div className="mt-4 bg-red-500/20 border border-red-300/30 rounded-lg p-3">
          <p className="text-red-100 text-sm">
            ⚠️ 예산을 초과했습니다. 지출을 점검해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
