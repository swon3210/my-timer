"use client";

import { BudgetCreateModalProps, BudgetFormValues } from "./types";
import { CategorySelector } from "./components/CategorySelector";
import { BudgetAmountInput } from "./components/BudgetAmountInput";
import { BudgetTitleInput } from "./components/BudgetTitleInput";
import { BudgetDescriptionInput } from "./components/BudgetDescriptionInput";
import { mapCategoriesToOptions } from "./utils";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { useForm } from "react-hook-form";
import { overlay } from "overlay-kit";

export const useBudgetFormModal = () => {
  const openBudgetFormModal = (
    params: {
      defaultValues?: BudgetFormValues;
      title?: string;
    } | void
  ) => {
    return overlay.openAsync<BudgetFormValues | undefined>(
      ({ close, isOpen }) => {
        return (
          <BudgetFormModal
            title={params?.title ?? "예산 설정"}
            defaultValues={params?.defaultValues}
            isOpen={isOpen}
            close={close}
          />
        );
      }
    );
  };

  return {
    openBudgetFormModal,
  };
};

export default function BudgetFormModal({
  title = "예산 설정",
  isOpen,
  close,
  defaultValues,
}: BudgetCreateModalProps) {
  const { data: categories = [] } = useAccountItemCategoriesQuery();

  const categoryOptions = mapCategoriesToOptions(categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormValues>({
    defaultValues: defaultValues ?? {
      title: "",
      amount: 0,
      description: "",
      categoryId: "",
    },
  });

  const handleFormSubmit = handleSubmit((formValues) => close(formValues));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => close()}
      />
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={() => close()}
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
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* 제목 */}
            <BudgetTitleInput register={register} error={errors.title} />

            {/* 설명 */}
            <BudgetDescriptionInput
              register={register}
              error={errors.description}
            />

            {/* 카테고리 선택 */}
            <CategorySelector
              categories={categoryOptions}
              register={register}
              error={errors.categoryId}
            />

            {/* 예산 금액 */}
            <BudgetAmountInput register={register} error={errors.amount} />

            {/* 버튼 */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => close()}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
