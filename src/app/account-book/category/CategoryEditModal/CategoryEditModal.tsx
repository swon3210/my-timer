"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateAccountItemCategoryMutation from "@/domains/account-book/categories/useUpdateTransactionCategoryMutation";
import { getTransactionCategoriesQueryKey } from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import InlineIconSelector from "@/components/ui/InlineIconSelector";
import { getIconById } from "@/app/_utils/category";
import { Category } from "@/domains/account-book/categories/types";

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
}

type CategoryEditFormValues = {
  name: string;
  icon: string;
};

export default function CategoryEditModal({
  isOpen,
  onClose,
  category,
}: CategoryEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateCategory } =
    useUpdateAccountItemCategoryMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryEditFormValues>({
    defaultValues: {
      name: category.displayedName,
      icon: category.icon || "more-horizontal",
    },
  });

  const selectedIcon = watch("icon");

  const handleIconChange = (iconId: string) => {
    setValue("icon", iconId);
  };

  const handleFormSubmit = async (data: CategoryEditFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updateCategory({
        categoryId: category.id,
        displayedName: data.name,
        icon: data.icon,
      });

      queryClient.invalidateQueries({
        queryKey: getTransactionCategoriesQueryKey(),
      });

      onClose();
    } catch (error) {
      console.error("카테고리 수정 중 오류가 발생했습니다:", error);
      alert("카테고리 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset({
      name: category.displayedName,
      icon: category.icon || "more-horizontal",
    });
    onClose();
  };

  if (!isOpen) return null;

  const categoryTypeLabel = {
    INCOME: "수입",
    EXPENSE: "지출",
    INVESTMENT: "투자",
    FLEX: "FLEX",
  }[category.type];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* 배경 오버레이 */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={handleClose}
        />

        {/* 모달 센터링을 위한 트릭 */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* 모달 콘텐츠 */}
        <div className="inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:my-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">카테고리 수정</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
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

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* 카테고리 타입 표시 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 유형
              </label>
              <div
                className={`px-4 py-3 rounded-xl border-2 ${
                  category.type === "INCOME"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : category.type === "EXPENSE"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : category.type === "INVESTMENT"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-purple-50 text-purple-700 border-purple-200"
                }`}
              >
                <span className="font-medium">{categoryTypeLabel}</span>
                <span className="text-sm ml-2 opacity-75">(변경 불가)</span>
              </div>
            </div>

            {/* 카테고리 이름 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 이름
              </label>
              <input
                {...register("name", {
                  required: "카테고리 이름을 입력해주세요",
                  minLength: {
                    value: 1,
                    message: "카테고리 이름은 최소 1글자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 20,
                    message: "카테고리 이름은 최대 20글자까지 가능합니다",
                  },
                })}
                type="text"
                placeholder="카테고리 이름을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 아이콘 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 아이콘
              </label>
              <InlineIconSelector
                selectedIconId={selectedIcon}
                categoryType={category.type}
                onIconSelect={handleIconChange}
              />
            </div>

            {/* 미리보기 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                미리보기
              </label>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    category.type === "INCOME"
                      ? "bg-green-100 text-green-600"
                      : category.type === "EXPENSE"
                      ? "bg-red-100 text-red-600"
                      : category.type === "INVESTMENT"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {(() => {
                    const IconComponent = getIconById(selectedIcon).icon;
                    return <IconComponent className="w-5 h-5" />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {watch("name") || "카테고리 이름"}
                    </span>
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full border">
                      {categoryTypeLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 text-white bg-blue-600 rounded-xl font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>수정 중...</span>
                  </>
                ) : (
                  <span>카테고리 수정</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
