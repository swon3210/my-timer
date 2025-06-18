"use client";

import { TransactionFilter, TransactionSort } from "@/types/transaction";
import { useState } from "react";

interface TransactionFilterProps {
  filter: TransactionFilter;
  sort: TransactionSort;
  onFilterChange: (filter: TransactionFilter) => void;
  onSortChange: (sort: TransactionSort) => void;
  onReset: () => void;
}

export default function TransactionFilterComponent({
  filter,
  sort,
  onFilterChange,
  onSortChange,
  onReset,
}: TransactionFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    "식비",
    "교통",
    "쇼핑",
    "문화",
    "의료",
    "급여",
    "용돈",
    "기타",
  ];

  const handleTypeChange = (type: "income" | "expense" | "all") => {
    onFilterChange({
      ...filter,
      type: type === "all" ? undefined : type,
    });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filter,
      category: category === "all" ? undefined : category,
    });
  };

  const handleDateRangeChange = (field: "start" | "end", value: string) => {
    onFilterChange({
      ...filter,
      dateRange: {
        ...filter.dateRange,
        [field]: value,
      } as { start: string; end: string },
    });
  };

  const handleSortChange = (field: "date" | "amount" | "category") => {
    if (sort.field === field) {
      onSortChange({
        field,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      onSortChange({
        field,
        direction: "desc",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h3 className="font-medium text-gray-900">필터 & 정렬</h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            초기화
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 빠른 필터 (항상 표시) */}
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleTypeChange("all")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !filter.type
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            전체
          </button>
          <button
            onClick={() => handleTypeChange("income")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter.type === "income"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            수입
          </button>
          <button
            onClick={() => handleTypeChange("expense")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter.type === "expense"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            지출
          </button>
        </div>

        {/* 정렬 */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">정렬:</span>
          {(["date", "amount", "category"] as const).map((field) => (
            <button
              key={field}
              onClick={() => handleSortChange(field)}
              className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 transition-colors ${
                sort.field === field
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>
                {field === "date" && "날짜"}
                {field === "amount" && "금액"}
                {field === "category" && "카테고리"}
              </span>
              {sort.field === field && (
                <svg
                  className={`w-3 h-3 transform transition-transform ${
                    sort.direction === "desc" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 상세 필터 (확장 시 표시) */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-0 space-y-4 border-t border-gray-100">
          {/* 카테고리 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={filter.category || "all"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체 카테고리</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* 날짜 범위 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시작일
              </label>
              <input
                type="date"
                value={filter.dateRange?.start || ""}
                onChange={(e) => handleDateRangeChange("start", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                종료일
              </label>
              <input
                type="date"
                value={filter.dateRange?.end || ""}
                onChange={(e) => handleDateRangeChange("end", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
