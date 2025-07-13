"use client";

import { TransactionFormData } from "@/types/transaction";
import { FormProvider, useForm } from "react-hook-form";
import PaymentMethodSelector from "./PaymentMethodSelector";
import useAddTransactionMutation from "@/domains/account-book/transactions/useAddTransactionMutation";
import useUpdateTransactionMutation from "@/domains/account-book/transactions/useUpdateTransactionMutation";
import TransactionCategorySelector from "./TransactionCategorySelector";
import TransactionTypeSelector from "./TransactionTypeSelector";
import { isEmpty } from "@/utils/text";

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: TransactionFormData;
}

export default function TransactionForm({
  isOpen,
  onClose,
  defaultValues,
}: TransactionFormProps) {
  const { mutate: addTransaction } = useAddTransactionMutation();

  const { mutate: updateTransaction } = useUpdateTransactionMutation();

  const form = useForm<TransactionFormData>({
    defaultValues: defaultValues ?? {
      id: "",
      amount: 0,
      type: "EXPENSE",
      categoryId: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form;

  const formData = watch();

  const handleFormSubmit = handleSubmit(async (formValues) => {
    if (defaultValues) {
      updateTransaction({
        id: defaultValues.id,
        transaction: {
          ...formValues,
          paymentMethod: isEmpty(formValues.paymentMethod)
            ? undefined
            : formValues.paymentMethod,
        },
      });
    } else {
      addTransaction({
        transaction: {
          ...formValues,
          paymentMethod: isEmpty(formValues.paymentMethod)
            ? undefined
            : formValues.paymentMethod,
        },
      });
    }

    form.reset();

    onClose();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            {defaultValues ? "거래 내역 수정" : "새 거래 내역"}
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
        <form onSubmit={handleFormSubmit} className="p-4 md:p-6 space-y-4">
          <FormProvider {...form}>
            <TransactionTypeSelector />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                금액 *
              </label>
              <input
                type="number"
                value={formData.amount || ""}
                onChange={(e) => setValue("amount", Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="금액을 입력하세요"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message || "금액을 입력해주세요"}
                </p>
              )}
            </div>

            {/* 카테고리 */}
            <TransactionCategorySelector />

            {/* 날짜 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                날짜 *
              </label>
              <input
                type="date"
                {...register("date")}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message || "날짜를 선택해주세요"}
                </p>
              )}
            </div>

            {/* 설명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <input
                type="text"
                {...register("description")}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="거래 내역 설명"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message || "설명을 입력해주세요"}
                </p>
              )}
            </div>

            {formData.type === "EXPENSE" && <PaymentMethodSelector />}

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
                {isSubmitting ? "저장 중..." : defaultValues ? "수정" : "추가"}
              </button>
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
}
