"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { getIconsByType, getIconById } from "@/app/_utils/category";
import { CategoryIcon } from "@/domains/account-book/categories/types";
import { TransactionType } from "@/domains/account-book/transactions/types";

interface IconSelectorProps {
  selectedIcon?: CategoryIcon;
  categoryType: TransactionType;
  onIconSelect: (iconId: CategoryIcon) => void;
  placeholder?: string;
}

export default function IconSelector({
  selectedIcon,
  categoryType,
  onIconSelect,
}: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const availableIcons = getIconsByType(categoryType);

  const filteredIcons = availableIcons.filter((iconItem) =>
    iconItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconId: CategoryIcon) => {
    onIconSelect(iconId);
    setIsOpen(false);
    setSearchTerm("");
  };

  const SelectedIcon = getIconById(selectedIcon)?.icon;

  return (
    <div className="relative">
      {/* 선택된 아이콘 표시 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
            {SelectedIcon && <SelectedIcon className="w-5 h-5 text-gray-600" />}
          </div>
          <span className="text-gray-700 font-medium">
            {getIconById(selectedIcon)?.name}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 아이콘 선택 드롭다운 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-hidden">
          {/* 검색 입력 */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="아이콘 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 아이콘 그리드 */}
          <div className="p-3 max-h-60 overflow-y-auto">
            {filteredIcons.length > 0 ? (
              <div className="grid grid-cols-6 gap-2">
                {filteredIcons.map((iconItem) => {
                  const isSelected = selectedIcon === iconItem.id;
                  const IconComponent = getIconById(iconItem.id)?.icon;

                  return (
                    <button
                      key={iconItem.id}
                      type="button"
                      onClick={() =>
                        handleIconSelect(iconItem.id as CategoryIcon)
                      }
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 hover:border-gray-300 bg-white text-gray-600"
                      }`}
                      title={iconItem.name}
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 mx-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">검색 결과가 없습니다</p>
              </div>
            )}
          </div>

          {/* 카테고리별 필터 표시 */}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              {categoryType === "INCOME"
                ? "수입"
                : categoryType === "EXPENSE"
                ? "지출"
                : categoryType === "INVESTMENT"
                ? "투자"
                : "FLEX"}{" "}
              카테고리 아이콘 ({filteredIcons.length}개)
            </p>
          </div>
        </div>
      )}

      {/* 배경 클릭 시 닫기 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsOpen(false);
            setSearchTerm("");
          }}
        />
      )}
    </div>
  );
}
