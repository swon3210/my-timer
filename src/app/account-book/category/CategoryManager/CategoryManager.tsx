"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddAccountItemCategoryMutation } from "@/domains/account-book/useAddAccountItemCategoryMutation";
import useAccountItemCategoriesQuery from "@/domains/account-book/useAccountItemCategoriesQuery";
import { Category } from "@/domains/account-book/types";
import useDeleteAccountItemCategoryMutation from "@/domains/account-book/useDeleteAccountItemCategoryMutation";

const CategoryItem = ({ category }: { category: Category }) => {
  const { mutate: deleteCategory } = useDeleteAccountItemCategoryMutation();

  return (
    <motion.div
      key={category.id}
      className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <span className="flex-grow font-medium">{category.displayedName}</span>
      <span
        className={`text-sm px-2 py-1 rounded ${
          category.type === "INCOME"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {category.type === "INCOME" ? "수입" : "지출"}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        // onClick={() => setEditingCategory(category.id)}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => deleteCategory(category.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

type CategoryFormValues = {
  name: string;
  type: "INCOME" | "EXPENSE";
};

export default function CategoryManager() {
  const { data: categories } = useAccountItemCategoriesQuery();

  const { mutate: addCategory } = useAddAccountItemCategoryMutation();

  const { register, handleSubmit, setValue, watch } =
    useForm<CategoryFormValues>({
      defaultValues: {
        name: "",
        type: "INCOME",
      },
    });

  const type = watch("type");

  const handleTypeChange = (value: string) => {
    setValue("type", value as "INCOME" | "EXPENSE");
  };

  const handleFormSubmit = (data: CategoryFormValues) => {
    addCategory({
      displayedName: data.name,
      type: data.type,
    });

    setValue("name", "");
  };

  return (
    <motion.form
      className="space-y-6 bg-white rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
          </SelectContent>
        </Select>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          추가
        </Button>
      </div>
      <div className="space-y-2">
        {categories?.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </motion.form>
  );
}
