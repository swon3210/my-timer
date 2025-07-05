"use client";

import { BudgetCreateModalProps, BudgetFormValues } from "./types";
import { CategorySelector } from "./components/CategorySelector";
import { BudgetAmountInput } from "./components/BudgetAmountInput";
import { mapCategoriesToOptions } from "./utils";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { useAddBudgetMutation } from "@/domains/account-book/budgets/useAddBudgetMutation";
import { useForm } from "react-hook-form";

export default function BudgetCreateModal({
  isOpen,
  onClose,
  defaultValues,
}: BudgetCreateModalProps) {
  const { data: categories = [] } = useAccountItemCategoriesQuery();

  const { mutateAsync: addBudget } = useAddBudgetMutation();

  const categoryOptions = mapCategoriesToOptions(categories);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormValues>({
    defaultValues: defaultValues ?? {
      title: "",
      amount: 0,
      categoryId: "",
    },
  });

  const { amount, categoryId } = watch();

  const handleFormSubmit = handleSubmit(
    async (formValues: BudgetFormValues) => {
      // await addBudget({
      //     description
      //   amount: formValues.amount,
      //   categoryId: formValues.selectedCategoryId,
      // });
      onClose();
    }
  );

  const handleCategorySelect = (categoryId: string) => {
    setValue("categoryId", categoryId);
  };

  const handleAmountChange = (amount: number) => {
    setValue("amount", amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {defaultValues ? "예산 수정" : "예산 설정"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 폼 */}
          <form onSubmit={handleFormSubmit}>
            {/* 제목 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예산 제목
              </label>
              <input
                type="text"
                {...register("title")}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="예산 제목을 입력하세요"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* 카테고리 선택 */}
            <CategorySelector
              categories={categoryOptions}
              selectedCategoryId={categoryId}
              onCategorySelect={handleCategorySelect}
              error={errors.categoryId?.message}
            />

            {/* 예산 금액 */}
            <BudgetAmountInput
              value={amount}
              onChange={handleAmountChange}
              error={errors.amount?.message}
            />

            {/* 버튼 */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {defaultValues ? "수정하기" : "생성하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
