"use client";

import {
  Transaction,
  TransactionFilter,
  TransactionSort,
} from "@/types/transaction";
import { useState, useEffect, useCallback, useRef } from "react";
import TransactionItem from "./TransactionItem";

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const observer = useRef<IntersectionObserver>();
  const lastTransactionElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 샘플 데이터 생성 함수
  const generateSampleTransactions = (
    page: number,
    count: number = 10
  ): Transaction[] => {
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
    const descriptions = [
      "스타벅스 커피",
      "지하철 교통비",
      "온라인 쇼핑",
      "영화 관람",
      "병원비",
      "월급",
      "용돈",
      "마트 장보기",
      "택시비",
      "책 구매",
      "카페 모임",
      "주유비",
      "편의점",
      "배달음식",
      "헬스장",
    ];
    const paymentMethods = [
      "현금",
      "신용카드",
      "체크카드",
      "계좌이체",
      "모바일페이",
    ];

    return Array.from({ length: count }, (_, i) => {
      const id = `${page}-${i}`;
      const isIncome = Math.random() > 0.7; // 30% 확률로 수입
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const description =
        descriptions[Math.floor(Math.random() * descriptions.length)];
      const amount = Math.floor(Math.random() * 100000) + 1000;

      // 최근 30일 내의 랜덤 날짜
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      return {
        id,
        userId: "user1",
        amount,
        type: isIncome ? "income" : "expense",
        category,
        description,
        date: date.toISOString().split("T")[0],
        paymentMethod:
          paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        location: Math.random() > 0.5 ? "강남구" : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Transaction;
    });
  };

  // 필터링 함수
  const applyFilters = (transactions: Transaction[]): Transaction[] => {
    return transactions.filter((transaction) => {
      // 타입 필터
      if (filter.type && transaction.type !== filter.type) {
        return false;
      }

      // 카테고리 필터
      if (filter.category && transaction.category !== filter.category) {
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
      let aValue: any;
      let bValue: any;

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
          aValue = a.category;
          bValue = b.category;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // 데이터 로드 함수
  const loadTransactions = useCallback(
    async (pageNum: number, isReset = false) => {
      setLoading(true);

      try {
        // 실제 API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newTransactions = generateSampleTransactions(pageNum);

        if (isReset) {
          setTransactions(newTransactions);
        } else {
          setTransactions((prev) => [...prev, ...newTransactions]);
        }

        // 더 이상 로드할 데이터가 없으면 hasMore를 false로 설정
        if (pageNum >= 5) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 초기 로드 및 필터/정렬 변경 시 리셋
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadTransactions(1, true);
  }, [filter, sort, loadTransactions]);

  // 페이지 변경 시 추가 로드
  useEffect(() => {
    if (page > 1) {
      loadTransactions(page, false);
    }
  }, [page, loadTransactions]);

  // 필터링 및 정렬 적용
  const filteredAndSortedTransactions = applySorting(
    applyFilters(transactions)
  );

  return (
    <div className="space-y-4">
      {/* 거래 내역 목록 */}
      {filteredAndSortedTransactions.length === 0 && !loading ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            거래 내역이 없습니다
          </h3>
          <p className="text-gray-500">새로운 거래 내역을 추가해보세요</p>
        </div>
      ) : (
        <>
          {filteredAndSortedTransactions.map((transaction, index) => {
            if (filteredAndSortedTransactions.length === index + 1) {
              return (
                <div
                  ref={lastTransactionElementRef}
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
            } else {
              return (
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
            }
          })}
        </>
      )}

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* 더 이상 로드할 데이터가 없을 때 */}
      {!hasMore && transactions.length > 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          모든 거래 내역을 불러왔습니다
        </div>
      )}
    </div>
  );
}
