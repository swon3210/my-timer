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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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

  return (
    <Dialog open={isOpen} onOpenChange={() => close()}>
      <DialogContent className="p-0 md:p-0">
        <div className="p-6 border-b border-gray-200">
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4 p-6">
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
      </DialogContent>
    </Dialog>
  );
}
