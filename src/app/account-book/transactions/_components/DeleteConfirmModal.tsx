"use client";

import { Transaction } from "@/app/api/account-books/transactions/types";
import useDeleteTransactionMutation from "@/domains/account-book/transactions/useDeleteTransactionMutation";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTransaction: Transaction;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  targetTransaction,
}: DeleteConfirmModalProps) {
  const { mutateAsync: deleteTransaction, isPending } =
    useDeleteTransactionMutation();

  const handleConfirm = async () => {
    await deleteTransaction(targetTransaction.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* 헤더 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                거래 내역 삭제
              </h3>
              <p className="text-sm text-gray-500">
                이 작업은 되돌릴 수 없습니다
              </p>
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">정말 삭제하시겠습니까?</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-medium text-gray-900">
              {targetTransaction.description}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            삭제된 거래 내역은 복구할 수 없습니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex space-x-3 p-6 pt-0">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                삭제 중...
              </>
            ) : (
              "삭제"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
