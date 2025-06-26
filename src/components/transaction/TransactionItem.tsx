"use client";

import { Transaction } from "@/types/transaction";
import { useState } from "react";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { getIconById } from "@/app/account-book/category/CategoryForm/IconSelector/categoryIcons";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: categories } = useAccountItemCategoriesQuery();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  // 카테고리 이름으로 카테고리 객체를 찾아서 아이콘 반환
  const getCategoryIcon = (categoryName: string) => {
    const category = categories?.find(
      (cat) => cat.displayedName === categoryName
    );
    if (category?.icon) {
      const IconComponent = getIconById(category.icon).icon;
      return <IconComponent className="w-5 h-5" />;
    }

    // 카테고리를 찾을 수 없거나 아이콘이 없는 경우 기본 아이콘 표시
    const DefaultIcon = getIconById().icon;
    return <DefaultIcon className="w-5 h-5" />;
  };

  // 카테고리 타입별 배경색과 텍스트 색상 반환
  const getCategoryColors = (categoryName: string) => {
    const category = categories?.find(
      (cat) => cat.displayedName === categoryName
    );
    if (!category) {
      return "bg-gray-100 text-gray-600";
    }

    switch (category.type) {
      case "INCOME":
        return "bg-green-100 text-green-600";
      case "EXPENSE":
        return "bg-red-100 text-red-600";
      case "INVESTMENT":
        return "bg-blue-100 text-blue-600";
      case "FLEX":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      {/* 모바일 레이아웃 */}
      <div className="block md:hidden">
        <div className="flex items-start space-x-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getCategoryColors(
              transaction.category
            )}`}
          >
            {getCategoryIcon(transaction.category)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm leading-5">
                  {transaction.description}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(transaction.date)}
                </p>
              </div>

              <div className="flex items-center space-x-2 ml-2">
                <span
                  className={`text-base font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </span>

                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
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
                        d="M12 5v.01M12 12v.01M12 19v.01"
                      />
                    </svg>
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={() => {
                          onEdit(transaction);
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          onDelete(transaction.id);
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-wrap">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {transaction.category}
              </span>
              {transaction.paymentMethod && (
                <span className="text-xs text-gray-500">
                  {transaction.paymentMethod}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColors(
                transaction.category
              )}`}
            >
              {getCategoryIcon(transaction.category)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {transaction.description}
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-lg font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatAmount(transaction.amount)}
                  </span>

                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
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
                          d="M12 5v.01M12 12v.01M12 19v.01"
                        />
                      </svg>
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <button
                          onClick={() => {
                            onEdit(transaction);
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                            onDelete(transaction.id);
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  {transaction.category}
                </span>
                <span>{formatDate(transaction.date)}</span>
                {transaction.paymentMethod && (
                  <span>{transaction.paymentMethod}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
