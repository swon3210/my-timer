"use client";

import { useState, useEffect } from "react";
import { Budget } from "@/types/budget";
import { CreateBudgetRequest } from "@/services/budgetService";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";

interface BudgetCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: CreateBudgetRequest) => void;
  period: "weekly" | "monthly" | "yearly";
  initialBudget?: Budget;
  selectedYear: number;
  selectedMonth?: number;
}

const CATEGORY_COLORS = [
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#F59E0B",
  "#3B82F6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6366F1",
  "#84CC16",
];

export default function BudgetCreateModal({
  isOpen,
  onClose,
  onSave,
  period,
  initialBudget,
  selectedYear,
  selectedMonth,
}: BudgetCreateModalProps) {
  const { data: categories = [] } = useAccountItemCategoriesQuery();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    categories: [] as Array<{
      categoryId: string;
      categoryName: string;
      allocatedAmount: string;
      color: string;
    }>,
  });

  // 카테고리별 예산 초기화
  useEffect(() => {
    if (categories.length > 0 && formData.categories.length === 0) {
      const expenseCategories = categories.filter(
        (cat) => cat.type === "EXPENSE"
      );
      const initialCategories = expenseCategories.map((category, index) => ({
        categoryId: category.id,
        categoryName: category.displayedName,
        allocatedAmount: "",
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }));

      setFormData((prev) => ({
        ...prev,
        categories: initialCategories,
      }));
    }
  }, [categories, formData.categories.length]);

  useEffect(() => {
    if (initialBudget) {
      setFormData({
        title: initialBudget.title,
        amount: initialBudget.amount.toString(),
        categories: initialBudget.categories.map((cat) => ({
          categoryId: cat.categoryId,
          categoryName: cat.categoryName,
          allocatedAmount: cat.allocatedAmount.toString(),
          color: cat.color,
        })),
      });
    } else {
      const periodText =
        period === "monthly" ? "월간" : period === "yearly" ? "연간" : "주간";
      const titleSuffix =
        period === "monthly" && selectedMonth !== undefined
          ? `${selectedYear}년 ${selectedMonth + 1}월`
          : `${selectedYear}년`;

      setFormData((prev) => ({
        ...prev,
        title: `${periodText} 예산 (${titleSuffix})`,
        amount: "",
      }));
    }
  }, [initialBudget, period, selectedYear, selectedMonth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalAmount = parseInt(formData.amount.replace(/,/g, ""));
    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert("올바른 예산 금액을 입력해주세요.");
      return;
    }

    const allocatedCategories = formData.categories.filter(
      (cat) =>
        cat.allocatedAmount &&
        parseInt(cat.allocatedAmount.replace(/,/g, "")) > 0
    );

    const totalAllocated = allocatedCategories.reduce(
      (sum, cat) => sum + parseInt(cat.allocatedAmount.replace(/,/g, "")),
      0
    );

    if (totalAllocated > totalAmount) {
      alert("카테고리별 할당 금액의 합이 전체 예산을 초과할 수 없습니다.");
      return;
    }

    // 시작일과 종료일 계산
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    if (period === "monthly") {
      const targetMonth =
        selectedMonth !== undefined ? selectedMonth : now.getMonth();
      startDate = new Date(selectedYear, targetMonth, 1);
      endDate = new Date(selectedYear, targetMonth + 1, 0);
    } else if (period === "yearly") {
      startDate = new Date(selectedYear, 0, 1);
      endDate = new Date(selectedYear, 11, 31);
    } else {
      // weekly
      startDate = new Date(selectedYear, now.getMonth(), now.getDate());
      endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    const budgetData: CreateBudgetRequest = {
      title: formData.title,
      amount: totalAmount,
      period,
      startDate,
      endDate,
      categories: allocatedCategories.map((cat) => ({
        categoryId: cat.categoryId,
        categoryName: cat.categoryName,
        allocatedAmount: parseInt(cat.allocatedAmount.replace(/,/g, "")),
        color: cat.color,
      })),
    };

    onSave(budgetData);
  };

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormData({ ...formData, amount: formattedValue });
  };

  const handleCategoryAmountChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const updatedCategories = [...formData.categories];
    updatedCategories[index].allocatedAmount = formattedValue;

    setFormData({ ...formData, categories: updatedCategories });
  };

  const totalAllocated = formData.categories.reduce((sum, cat) => {
    const amount = cat.allocatedAmount
      ? parseInt(cat.allocatedAmount.replace(/,/g, ""))
      : 0;
    return sum + amount;
  }, 0);

  const totalBudget = formData.amount
    ? parseInt(formData.amount.replace(/,/g, ""))
    : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {initialBudget ? "예산 수정" : "예산 설정"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
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

          {/* 폼 */}
          <form onSubmit={handleSubmit}>
            {/* 제목 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예산 제목
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예산 제목을 입력하세요"
                required
              />
            </div>

            {/* 총 예산 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                총 예산 금액
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예산 금액을 입력하세요"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.amount &&
                  `${parseInt(
                    formData.amount.replace(/,/g, "")
                  ).toLocaleString()}원`}
              </p>
            </div>

            {/* 카테고리별 예산 할당 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  카테고리별 예산 할당
                </label>
                <p className="text-sm text-gray-500">
                  할당: {totalAllocated.toLocaleString()}원 / 총 예산:{" "}
                  {totalBudget.toLocaleString()}원
                </p>
              </div>

              {totalAllocated > totalBudget && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">
                    카테고리별 할당 금액이 총 예산을 초과합니다.
                  </p>
                </div>
              )}

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {formData.categories.map((category, index) => (
                  <div
                    key={category.categoryId}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        {category.categoryName}
                      </p>
                    </div>
                    <div className="w-32">
                      <input
                        type="text"
                        value={category.allocatedAmount}
                        onChange={(e) =>
                          handleCategoryAmountChange(index, e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {initialBudget ? "수정하기" : "생성하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
