"use client";

import { useState, useCallback } from "react";
import { TransactionFilter, TransactionSort } from "@/types/transaction";
import TransactionList from "./_components/TransactionList";
import TransactionForm from "./_components/TransactionForm";
import TransactionFilterComponent from "./_components/TransactionFilter";
import DeleteConfirmModal from "./_components/DeleteConfirmModal";
import { Transaction } from "@/app/api/account-books/transactions/types";
import { useTransactionsQuery } from "@/domains/account-book/useTransactionsQuery";

export default function TransactionsPage() {
  // 상태 관리
  const [filter, setFilter] = useState<TransactionFilter>({});
  const [sort, setSort] = useState<TransactionSort>({
    field: "date",
    direction: "desc",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 모달 상태
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(
    null
  );

  const { data: transactions = [] } = useTransactionsQuery();

  const targetTransaction = transactions.find(
    (transaction) => transaction.id === deleteTransactionId
  );

  // 거래 내역 수정 처리
  const handleEditTransaction = useCallback((transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  }, []);

  // 거래 내역 삭제 처리
  const handleDeleteTransaction = useCallback((id: string) => {
    setIsDeleteModalOpen(true);
    setDeleteTransactionId(id);
  }, []);

  // 필터 초기화
  const handleResetFilter = useCallback(() => {
    setFilter({});
    setSort({
      field: "date",
      direction: "desc",
    });
  }, []);

  // 새 거래 내역 추가
  const handleAddTransaction = useCallback(() => {
    setEditingTransaction(undefined);
    setIsFormOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* 모바일 친화적 헤더 */}
        <div className="px-4 py-6 md:px-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                거래 내역
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                수입과 지출을 관리하고 분석하세요
              </p>
            </div>

            <button
              onClick={handleAddTransaction}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>새 거래 추가</span>
            </button>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="px-4 md:px-6 pb-6">
          {/* 모바일 필터 토글 */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors"
            >
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
                <span className="font-medium">필터 & 정렬</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 데스크톱 필터 사이드바 */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-6">
                <TransactionFilterComponent
                  filter={filter}
                  sort={sort}
                  onFilterChange={setFilter}
                  onSortChange={setSort}
                  onReset={handleResetFilter}
                />
              </div>
            </div>

            {/* 모바일 필터 (토글) */}
            {isFilterOpen && (
              <div className="lg:hidden col-span-1 mb-4">
                <div className="animate-slide-down">
                  <TransactionFilterComponent
                    filter={filter}
                    sort={sort}
                    onFilterChange={setFilter}
                    onSortChange={setSort}
                    onReset={handleResetFilter}
                  />
                </div>
              </div>
            )}

            {/* 거래 내역 목록 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    거래 내역
                  </h2>
                </div>

                <TransactionList
                  filter={filter}
                  sort={sort}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 거래 내역 폼 모달 */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTransaction(undefined);
        }}
        defaultValues={
          editingTransaction
            ? {
                id: editingTransaction.id,
                amount: editingTransaction.amount,
                type: editingTransaction.type,
                categoryId: editingTransaction.categoryId,
                description: editingTransaction.description,
                date: editingTransaction.date,
              }
            : undefined
        }
      />

      {targetTransaction && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          targetTransaction={targetTransaction}
        />
      )}
    </div>
  );
}
