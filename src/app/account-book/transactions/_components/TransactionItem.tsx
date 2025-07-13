"use client";

import { useState } from "react";
import {
  Transaction,
  TransactionPaymentMethod,
} from "@/app/api/account-books/transactions/types";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { getIconById } from "@/app/_utils/category";

const getPaymentMethodDisplayedName = (
  paymentMethod: TransactionPaymentMethod
) => {
  switch (paymentMethod) {
    case "CASH":
      return "현금";
    case "CREDIT_CARD":
      return "신용카드";
    case "DEBIT_CARD":
      return "체크카드";
    case "TRANSFER":
      return "계좌이체";
  }
};

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
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  const getCategoryDisplayedName = (categoryId: string) => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category?.displayedName;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories?.find((cat) => cat.id === categoryId);

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
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getCategoryColors(
            transaction.categoryId
          )}`}
        >
          {getCategoryIcon(transaction.categoryId)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
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
                  transaction.type === "INCOME"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatAmount(transaction.amount)}
              </span>

              <div className="relative size-5">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-full text-gray-400"
                >
                  <svg
                    className="size-5"
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
              {getCategoryDisplayedName(transaction.categoryId)}
            </span>
            {transaction.paymentMethod && (
              <span className="text-xs text-gray-500">
                {getPaymentMethodDisplayedName(transaction.paymentMethod)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
