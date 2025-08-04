"use client";

import { TransactionFilter, TransactionSort } from "@/types/transaction";
import TransactionItem from "./TransactionItem";
import EmptyTransactionList from "./EmptyTransactionList";
import { useTransactionsQuery } from "@/domains/account-book/transactions/useTransactionsQuery";
import { Transaction } from "@/app/api/account-books/transactions/types";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

interface TransactionListProps {
  filter: TransactionFilter;
  sort: TransactionSort;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onAddTransaction: (transaction: Transaction) => void;
}

export default function TransactionList({
  filter,
  sort,
  onEdit,
  onDelete,
  onAddTransaction,
}: TransactionListProps) {
  const { data: transactions = [], isLoading } = useTransactionsQuery();

  const [ref, entry] = useIntersectionObserver();
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [entry]);

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

  const items: JSX.Element[] = [];
  let currentDate: string | null = null;

  filteredAndSortedTransactions
    .slice(0, page * 30)
    .forEach((transaction, index) => {
      const transactionDate = dayjs(transaction.date).format(
        "YYYY년 MM월 DD일"
      );

      // 날짜가 변경되면 구분자를 추가
      if (currentDate !== transactionDate) {
        currentDate = transactionDate;
        items.push(
          <div
            key={`divider-${transaction.id}`}
            className="date-divider flex items-center justify-between"
          >
            <span>{currentDate}</span>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              onClick={() => {
                onAddTransaction(transaction);
              }}
            >
              <PlusIcon className="w-4 h-4 text-primary-heavy" />
            </Button>
          </div>
        );
      }

      items.push(
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
      );
    });

  return (
    <div className="space-y-4">
      {items}
      <div ref={ref} />
    </div>
  );
}
