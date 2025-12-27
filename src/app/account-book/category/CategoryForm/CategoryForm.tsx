"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useAddTransactionCategoryMutation } from "@/domains/account-book/categories/useAddTransactionCategoryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { getTransactionCategoriesQueryKey } from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import IconSelector from "@/components/ui/InlineIconSelector";
import { DEFAULT_ICONS } from "@/app/_utils/category";
import { useUserQuery } from "@/domains/users/useUserQuery";
import { CategoryIcon } from "@/domains/account-book/categories/types";
import { TransactionType } from "@/domains/account-book/transactions/types";

type CategoryFormValues = {
  name: string;
  type: TransactionType;
  icon: CategoryIcon;
};

export default function CategoryForm() {
  const queryClient = useQueryClient();

  const { data: user } = useUserQuery();

  const { mutateAsync: addCategory } = useAddTransactionCategoryMutation();
  const { register, handleSubmit, setValue, watch } =
    useForm<CategoryFormValues>({
      defaultValues: {
        name: "",
        type: "INCOME",
        icon: DEFAULT_ICONS.INCOME,
      },
    });

  const type = watch("type");
  const selectedIcon = watch("icon");

  const handleTypeChange = (value: string) => {
    const newType = value as TransactionType;
    setValue("type", newType);
    // 타입이 변경되면 해당 타입의 기본 아이콘으로 설정
    setValue("icon", DEFAULT_ICONS[newType as keyof typeof DEFAULT_ICONS]);
  };

  const handleIconChange = (iconId: CategoryIcon) => {
    setValue("icon", iconId);
  };

  const handleFormSubmit = async ({ icon, name, type }: CategoryFormValues) => {
    if (!user) {
      return;
    }

    try {
      await addCategory({
        displayedName: name,
        type,
        icon,
      });

      setValue("name", "");
      setValue("icon", DEFAULT_ICONS[type as keyof typeof DEFAULT_ICONS]);

      queryClient.invalidateQueries({
        queryKey: getTransactionCategoriesQueryKey(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="space-y-4 bg-white rounded-lg"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* 아이콘 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리 아이콘
        </label>
        <IconSelector
          selectedIconId={selectedIcon}
          categoryType={type}
          onIconSelect={handleIconChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 카테고리 이름 */}
        <div className="md:col-span-2">
          <Input
            {...register("name", { required: true })}
            placeholder="새 카테고리 이름"
            className="w-full"
          />
        </div>

        {/* 카테고리 타입 */}
        <div>
          <Select value={type} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="유형" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">수입</SelectItem>
              <SelectItem value="EXPENSE">지출</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 추가 버튼 */}
        <div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
          >
            추가
          </Button>
        </div>
      </div>
    </form>
  );
}
