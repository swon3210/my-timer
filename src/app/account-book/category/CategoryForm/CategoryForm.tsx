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
import { useAddAccountItemCategoryMutation } from "@/domains/account-book/categories/useAddAccountItemCategoryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { getAccountItemCategoriesQueryKey } from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { TransactionType } from "@/domains/account-book/types";

type CategoryFormValues = {
  name: string;
  type: TransactionType;
};

export default function CategoryForm() {
  const queryClient = useQueryClient();

  const { mutateAsync: addCategory } = useAddAccountItemCategoryMutation();
  const { register, handleSubmit, setValue, watch } =
    useForm<CategoryFormValues>({
      defaultValues: {
        name: "",
        type: "INCOME",
      },
    });

  const type = watch("type");

  const handleTypeChange = (value: string) => {
    setValue("type", value as TransactionType);
  };

  const handleFormSubmit = async (data: CategoryFormValues) => {
    try {
      await addCategory({
        displayedName: data.name,
        type: data.type,
      });

      setValue("name", "");

      queryClient.invalidateQueries({
        queryKey: getAccountItemCategoriesQueryKey(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="space-y-6 bg-white rounded-lg"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex space-x-2">
        <Input
          {...register("name", { required: true })}
          placeholder="새 카테고리 이름"
          className="flex-grow"
        />
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INCOME">수입</SelectItem>
            <SelectItem value="EXPENSE">지출</SelectItem>
            <SelectItem value="FLEX">FLEX</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          추가
        </Button>
      </div>
    </form>
  );
}
