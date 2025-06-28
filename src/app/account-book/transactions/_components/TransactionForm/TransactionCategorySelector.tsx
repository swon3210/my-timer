import useTransactionCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { TransactionFormData } from "@/types/transaction";
import { useFormContext } from "react-hook-form";

export default function TransactionCategorySelector() {
  const { data: categories } = useTransactionCategoriesQuery();

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<TransactionFormData>();

  const type = watch("type");

  if (categories == null) {
    return null;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        카테고리 *
      </label>
      <select
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors.categoryId ? "border-red-500" : "border-gray-300"
        }`}
        {...register("categoryId")}
      >
        <option value="">카테고리를 선택하세요</option>
        {categories
          .filter((category) => category.type === type)
          .map((category) => (
            <option key={category.id} value={category.id}>
              {category.displayedName}
            </option>
          ))}
      </select>
      {errors.categoryId && (
        <p className="text-red-500 text-sm mt-1">
          {errors.categoryId?.message?.toString() ?? "카테고리를 선택해주세요"}
        </p>
      )}
    </div>
  );
}
