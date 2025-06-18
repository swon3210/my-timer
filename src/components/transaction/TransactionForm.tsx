"use client";

import { Transaction, TransactionFormData } from "@/types/transaction";
import { useState, useEffect } from "react";

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
  editingTransaction?: Transaction | null;
}

export default function TransactionForm({
  isOpen,
  onClose,
  onSubmit,
  editingTransaction,
}: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: 0,
    type: "expense",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const paymentMethods = [
    "현금",
    "신용카드",
    "체크카드",
    "계좌이체",
    "모바일페이",
  ];

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        description: editingTransaction.description,
        date: editingTransaction.date,
        paymentMethod: editingTransaction.paymentMethod || "",
        location: editingTransaction.location || "",
      });
    } else {
      setFormData({
        amount: 0,
        type: "expense",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "",
        location: "",
      });
    }
    setErrors({});
  }, [editingTransaction, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "금액을 입력해주세요";
    }
    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요";
    }
    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요";
    }
    if (!formData.date) {
      newErrors.date = "날짜를 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to submit transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof TransactionFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 에러 제거
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            {editingTransaction ? "거래 내역 수정" : "새 거래 내역"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          {/* 수입/지출 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              유형
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleInputChange("type", "income")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === "income"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                수입
              </button>
              <button
                type="button"
                onClick={() => handleInputChange("type", "expense")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === "expense"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                지출
              </button>
            </div>
          </div>

          {/* 금액 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              금액 *
            </label>
            <input
              type="number"
              value={formData.amount || ""}
              onChange={(e) =>
                handleInputChange("amount", Number(e.target.value))
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="금액을 입력하세요"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">카테고리를 선택하세요</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="거래 내역 설명"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* 날짜 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              날짜 *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* 결제 수단 (선택) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              결제 수단
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                handleInputChange("paymentMethod", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">선택하세요</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* 장소 (선택) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              장소
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="거래 장소 (선택)"
            />
          </div>

          {/* 버튼 */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting
                ? "저장 중..."
                : editingTransaction
                ? "수정"
                : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
