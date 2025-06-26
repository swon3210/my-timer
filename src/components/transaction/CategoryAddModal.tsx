"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useAddAccountItemCategoryMutation } from "@/domains/account-book/categories/useAddAccountItemCategoryMutation";
import { getAccountItemCategoriesQueryKey } from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { TransactionType } from "@/domains/account-book/types";
import InlineIconSelector from "@/components/ui/InlineIconSelector";
import { DEFAULT_ICONS } from "@/app/account-book/category/CategoryForm/IconSelector/categoryIcons";

interface CategoryAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "income" | "expense";
}

type CategoryFormValues = {
  name: string;
  type: TransactionType;
  icon: string;
};

export default function CategoryAddModal({
  isOpen,
  onClose,
  initialType = "expense",
}: CategoryAddModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: addCategory } = useAddAccountItemCategoryMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: "",
      type: initialType === "income" ? "INCOME" : "EXPENSE",
      icon:
        initialType === "income" ? DEFAULT_ICONS.INCOME : DEFAULT_ICONS.EXPENSE,
    },
  });

  const type = watch("type");
  const selectedIcon = watch("icon");

  const handleTypeChange = (value: TransactionType) => {
    setValue("type", value);
    // 타입이 변경되면 해당 타입의 기본 아이콘으로 설정
    setValue("icon", DEFAULT_ICONS[value]);
  };

  const handleIconChange = (iconId: string) => {
    setValue("icon", iconId);
  };

  const handleFormSubmit = async (data: CategoryFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addCategory({
        displayedName: data.name,
        type: data.type,
        icon: data.icon,
      });

      reset();
      queryClient.invalidateQueries({
        queryKey: getAccountItemCategoriesQueryKey(),
      });

      onClose();
    } catch (error) {
      console.error("카테고리 추가 중 오류가 발생했습니다:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

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
            <h3 className="text-lg font-bold text-gray-900">
              새 카테고리 추가
            </h3>
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

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* 카테고리 기본 정보 섹션 */}
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  기본 정보
                </h4>
                <p className="text-xs text-gray-600">
                  카테고리의 이름과 유형을 설정해주세요
                </p>
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
                  placeholder="예: 온라인 쇼핑, 부업 수입"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* 카테고리 타입 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리 유형
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleTypeChange("INCOME")}
                    className={`px-3 py-3 rounded-xl font-medium transition-all ${
                      type === "INCOME"
                        ? "bg-green-100 text-green-700 border-2 border-green-300"
                        : "bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    수입
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange("EXPENSE")}
                    className={`px-3 py-3 rounded-xl font-medium transition-all ${
                      type === "EXPENSE"
                        ? "bg-red-100 text-red-700 border-2 border-red-300"
                        : "bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    지출
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange("INVESTMENT")}
                    className={`px-3 py-3 rounded-xl font-medium transition-all ${
                      type === "INVESTMENT"
                        ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                        : "bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    투자
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange("FLEX")}
                    className={`px-3 py-3 rounded-xl font-medium transition-all ${
                      type === "FLEX"
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                        : "bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    FLEX
                  </button>
                </div>
              </div>
            </div>

            {/* 아이콘 선택 섹션 */}
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  아이콘 설정
                </h4>
                <p className="text-xs text-gray-600">
                  {type === "INCOME"
                    ? "수입"
                    : type === "EXPENSE"
                    ? "지출"
                    : type === "INVESTMENT"
                    ? "투자"
                    : "FLEX"}{" "}
                  카테고리에 사용할 아이콘을 선택해주세요
                </p>
              </div>

              <InlineIconSelector
                selectedIconId={selectedIcon}
                categoryType={type}
                onIconSelect={handleIconChange}
              />
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
                    <span>추가 중...</span>
                  </>
                ) : (
                  <span>카테고리 추가</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
