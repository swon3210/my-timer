"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Transaction,
  TransactionFilter,
  TransactionSort,
  TransactionFormData,
} from "@/types/transaction";
import TransactionList from "@/components/transaction/TransactionList";
import TransactionForm from "@/components/transaction/TransactionForm";
import TransactionFilterComponent from "@/components/transaction/TransactionFilter";
import DeleteConfirmModal from "@/components/transaction/DeleteConfirmModal";
import CategoryAddModal from "@/components/transaction/CategoryAddModal";

export default function TransactionsPage() {
  const router = useRouter();

  // 상태 관리
  const [filter, setFilter] = useState<TransactionFilter>({});
  const [sort, setSort] = useState<TransactionSort>({
    field: "date",
    direction: "desc",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 모달 상태
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    transactionId: string;
    transactionDescription: string;
  }>({
    isOpen: false,
    transactionId: "",
    transactionDescription: "",
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // 거래 내역 추가/수정 처리
  const handleSubmitTransaction = useCallback(
    async (data: TransactionFormData): Promise<void> => {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingTransaction) {
        console.log("Updating transaction:", editingTransaction.id, data);
        // 실제로는 API를 호출하여 거래 내역을 업데이트
      } else {
        console.log("Creating new transaction:", data);
        // 실제로는 API를 호출하여 새 거래 내역을 생성
      }

      // 폼 닫기 및 상태 초기화
      setIsFormOpen(false);
      setEditingTransaction(null);
    },
    [editingTransaction]
  );

  // 거래 내역 수정 처리
  const handleEditTransaction = useCallback((transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  }, []);

  // 거래 내역 삭제 처리
  const handleDeleteTransaction = useCallback((id: string) => {
    // 여기서는 간단히 ID로 설명을 찾는다고 가정
    const description = `거래 내역 ${id}`;
    setDeleteModal({
      isOpen: true,
      transactionId: id,
      transactionDescription: description,
    });
  }, []);

  // 삭제 확인 처리
  const handleConfirmDelete = useCallback(async (): Promise<void> => {
    // API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Deleting transaction:", deleteModal.transactionId);
  }, [deleteModal.transactionId]);

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
    setEditingTransaction(null);
    setIsFormOpen(true);
  }, []);

  // 카테고리 추가 모달 관리
  const handleOpenCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(true);
  }, []);

  const handleCloseCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(false);
  }, []);

  // 카테고리 관리 페이지로 이동
  const handleGoToCategoryManagement = useCallback(() => {
    router.push("/account-book/category");
  }, [router]);

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

            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3">
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

              <div className="flex space-x-2">
                <button
                  onClick={handleOpenCategoryModal}
                  className="flex-1 md:flex-none md:w-auto px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
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
                  <span className="hidden sm:inline">카테고리 추가</span>
                  <span className="sm:hidden">추가</span>
                </button>

                <button
                  onClick={handleGoToCategoryManagement}
                  className="flex-1 md:flex-none md:w-auto px-4 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-all hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span className="hidden sm:inline">카테고리 관리</span>
                  <span className="sm:hidden">관리</span>
                </button>
              </div>
            </div>
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
                  <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>자동으로 새로고침됩니다</span>
                  </div>
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
          setEditingTransaction(null);
        }}
        onSubmit={handleSubmitTransaction}
        editingTransaction={editingTransaction}
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        transactionDescription={deleteModal.transactionDescription}
      />

      {/* 카테고리 추가 모달 */}
      <CategoryAddModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
      />
    </div>
  );
}
