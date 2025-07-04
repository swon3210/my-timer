"use client";

import { TransactionFilter, TransactionSort } from "@/types/transaction";
import TransactionItem from "./TransactionItem";
import EmptyTransactionList from "./EmptyTransactionList";
import { useTransactionsQuery } from "@/domains/account-book/useTransactionsQuery";
import { Transaction } from "@/app/api/account-books/transactions/types";

interface TransactionListProps {
  filter: TransactionFilter;
  sort: TransactionSort;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({
  filter,
  sort,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const { data: transactions = [], isLoading } = useTransactionsQuery();
  // 필터링 함수
  const applyFilters = (transactions: Transaction[]): Transaction[] => {
    return transactions.filter((transaction) => {
      // 타입 필터
      if (filter.type && transaction.type !== filter.type) {
        return false;
      }

      // 카테고리 필터
      if (filter.category && transaction.categoryId !== filter.category) {
        return false;
      }

      // 날짜 범위 필터
      if (filter.dateRange) {
        const transactionDate = new Date(transaction.date);
        if (filter.dateRange.start) {
          const startDate = new Date(filter.dateRange.start);
          if (transactionDate < startDate) return false;
        }
        if (filter.dateRange.end) {
          const endDate = new Date(filter.dateRange.end);
          if (transactionDate > endDate) return false;
        }
      }

      return true;
    });
  };

  // 정렬 함수
  const applySorting = (transactions: Transaction[]): Transaction[] => {
    return [...transactions].sort((a, b) => {
      let aValue: number | string | Date;
      let bValue: number | string | Date;

      switch (sort.field) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "category":
          aValue = a.categoryId;
          bValue = b.categoryId;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // 필터링 및 정렬 적용
  const filteredAndSortedTransactions = applySorting(
    applyFilters(transactions)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (filteredAndSortedTransactions.length === 0) {
    return <EmptyTransactionList />;
  }

  return (
    <div className="space-y-4">
      {/* 거래 내역 목록 */}
      {filteredAndSortedTransactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className="animate-fade-in"
          style={{ animationDelay: `${(index % 10) * 50}ms` }}
        >
          <TransactionItem
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
