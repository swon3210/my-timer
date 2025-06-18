"use client";

import { CategoryStatus } from "@/types/budget";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";

interface CategoryBudgetListProps {
  categories: CategoryStatus[];
}

export default function CategoryBudgetList({
  categories,
}: CategoryBudgetListProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">카테고리별 예산</h3>
      </div>

      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <div
            className="p-4 cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium text-gray-800">
                  {category.name}
                </span>
                {category.isOverBudget && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                    초과
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">
                  {formatCurrency(category.spent)}
                </p>
                <p className="text-sm text-gray-500">
                  / {formatCurrency(category.allocated)}
                </p>
              </div>
            </div>

            {/* 진행률 바 */}
            <div className="mb-2">
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ease-out ${
                    category.isOverBudget
                      ? "bg-red-500"
                      : category.percentage > 80
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(category.percentage, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {category.percentage.toFixed(1)}% 사용
              </span>
              <span
                className={`font-medium ${
                  category.isOverBudget ? "text-red-600" : "text-gray-600"
                }`}
              >
                {category.isOverBudget ? "초과" : "남음"}{" "}
                {formatCurrency(Math.abs(category.remaining))}
              </span>
            </div>
          </div>

          {/* 확장된 상세 정보 */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              expandedCategory === category.id
                ? "max-h-32 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">할당 예산</p>
                  <p className="font-bold text-blue-600">
                    {formatCurrency(category.allocated)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">사용 금액</p>
                  <p
                    className={`font-bold ${
                      category.isOverBudget ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {formatCurrency(category.spent)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">설정된 카테고리 예산이 없습니다.</p>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            카테고리 예산 설정하기
          </button>
        </div>
      )}
    </div>
  );
}
