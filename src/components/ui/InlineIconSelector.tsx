"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { TransactionType } from "@/app/api/account-books/transactions/types";
import {
  getIconsByType,
  getIconById,
  DEFAULT_ICONS,
} from "@/app/account-book/category/CategoryForm/IconSelector/categoryIcons";

interface InlineIconSelectorProps {
  selectedIconId?: string;
  categoryType: TransactionType;
  onIconSelect: (iconId: string) => void;
}

export default function InlineIconSelector({
  selectedIconId,
  categoryType,
  onIconSelect,
}: InlineIconSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const availableIcons = getIconsByType(categoryType);
  const selectedIcon = selectedIconId
    ? getIconById(selectedIconId)
    : getIconById(DEFAULT_ICONS[categoryType]);

  const filteredIcons = availableIcons.filter((iconItem) =>
    iconItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconId: string) => {
    onIconSelect(iconId);
  };

  return (
    <div className="space-y-3">
      {/* 검색 입력 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="아이콘 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* 아이콘 그리드 */}
      <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
        {filteredIcons.length > 0 ? (
          <>
            <div className="grid grid-cols-6 gap-3 max-h-32 overflow-y-auto">
              {filteredIcons.slice(0, 24).map((iconItem) => {
                const IconComponent = iconItem.icon;
                const isSelected = selectedIconId === iconItem.id;

                return (
                  <button
                    key={iconItem.id}
                    type="button"
                    onClick={() => handleIconSelect(iconItem.id)}
                    className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      isSelected
                        ? categoryType === "INCOME"
                          ? "border-green-400 bg-green-100 text-green-600"
                          : categoryType === "EXPENSE"
                          ? "border-red-400 bg-red-100 text-red-600"
                          : categoryType === "INVESTMENT"
                          ? "border-blue-400 bg-blue-100 text-blue-600"
                          : "border-purple-400 bg-purple-100 text-purple-600"
                        : "border-gray-300 hover:border-gray-400 bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                    title={iconItem.name}
                  >
                    <IconComponent className="w-5 h-5 mx-auto" />
                  </button>
                );
              })}
            </div>
            {filteredIcons.length > 24 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                처음 24개 아이콘만 표시됩니다. 검색어를 입력해 더 찾아보세요.
              </p>
            )}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-300">
              <p className="text-xs text-gray-500">
                {categoryType === "INCOME"
                  ? "수입"
                  : categoryType === "EXPENSE"
                  ? "지출"
                  : categoryType === "INVESTMENT"
                  ? "투자"
                  : "FLEX"}{" "}
                카테고리 아이콘 ({filteredIcons.length}개)
              </p>
              {selectedIcon && (
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <span>선택됨:</span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      categoryType === "INCOME"
                        ? "bg-green-100 text-green-600"
                        : categoryType === "EXPENSE"
                        ? "bg-red-100 text-red-600"
                        : categoryType === "INVESTMENT"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <selectedIcon.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{selectedIcon.name}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">검색 결과가 없습니다</p>
            <p className="text-xs text-gray-400 mt-1">
              다른 검색어를 시도해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
