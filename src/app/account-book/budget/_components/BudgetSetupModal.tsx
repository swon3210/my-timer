"use client";

import { Budget } from "@/types/budget";
import { formatCurrency } from "@/utils/format";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface BudgetSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: Partial<Budget>) => void;
  initialBudget?: Budget;
}

export default function BudgetSetupModal({
  isOpen,
  onClose,
  onSave,
  initialBudget,
}: BudgetSetupModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    period: "monthly" as "weekly" | "monthly" | "yearly",
  });

  useEffect(() => {
    if (initialBudget) {
      setFormData({
        title: initialBudget.title,
        amount: initialBudget.amount.toString(),
        period: initialBudget.period,
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        period: "monthly",
      });
    }
  }, [initialBudget, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(formData.amount.replace(/,/g, ""));
    if (isNaN(amount) || amount <= 0) return;

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    let endDate: Date;

    switch (formData.period) {
      case "weekly":
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "yearly":
        endDate = new Date(now.getFullYear() + 1, 0, 1);
        break;
      default: // monthly
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    onSave({
      title: formData.title,
      amount,
      period: formData.period,
      startDate,
      endDate,
    });
  };

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormData({ ...formData, amount: formattedValue });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 md:p-0">
        <div className="p-6 border-b border-gray-200">
          <DialogTitle className="text-xl">
            {initialBudget ? "예산 수정" : "새 예산 설정"}
          </DialogTitle>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* 예산 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예산 제목
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="예: 생활비, 용돈 등"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* 예산 금액 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예산 금액
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="1,000,000"
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                원
              </span>
            </div>
            {formData.amount && (
              <p className="mt-2 text-sm text-gray-600">
                {formatCurrency(
                  parseInt(formData.amount.replace(/,/g, "")) || 0
                )}
              </p>
            )}
          </div>

          {/* 예산 기간 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              예산 기간
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "weekly", label: "주간", desc: "1주" },
                { value: "monthly", label: "월간", desc: "1개월" },
                { value: "yearly", label: "연간", desc: "1년" },
              ].map((period) => (
                <button
                  key={period.value}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      period: period.value as "weekly" | "monthly" | "yearly",
                    })
                  }
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.period === period.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">{period.label}</div>
                  <div className="text-sm text-gray-500">{period.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              {initialBudget ? "수정" : "설정"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
