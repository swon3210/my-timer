"use client";

import { BudgetCreateModalProps, BudgetFormValues } from "./types";
import { CategorySelector } from "./components/CategorySelector";
import { BudgetAmountInput } from "./components/BudgetAmountInput";
import { BudgetTitleInput } from "./components/BudgetTitleInput";
import { BudgetDescriptionInput } from "./components/BudgetDescriptionInput";
import { mapCategoriesToOptions } from "./utils";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { useAddBudgetMutation } from "@/domains/account-book/budgets/useAddBudgetMutation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BudgetCreateModal({
  isOpen,
  onClose,
  defaultValues,
}: BudgetCreateModalProps) {
  const { data: categories = [] } = useAccountItemCategoriesQuery();

  const { mutateAsync: addBudget, isPending } = useAddBudgetMutation();

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

  const handleFormSubmit = handleSubmit(
    async (formValues: BudgetFormValues) => {
      try {
        const now = new Date().toISOString();

        await addBudget({
          title: formValues.title,
          amount: formValues.amount,
          description: formValues.description,
          categoryId: formValues.categoryId,
          startAt: now,
          endAt: now,
        });

        toast.success(
          defaultValues
            ? "예산이 성공적으로 수정되었습니다."
            : "예산이 성공적으로 생성되었습니다."
        );
        onClose();
      } catch (error) {
        toast.error("예산 저장에 실패했습니다. 다시 시도해주세요.");
        console.error("Budget creation error:", error);
      }
    }
  );

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
                onClick={onClose}
                disabled={isPending}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending
                  ? "저장 중..."
                  : defaultValues
                  ? "수정하기"
                  : "생성하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
