import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType } from "@/domains/account-book/types";
import useAccountItemCategoriesQuery from "@/domains/account-book/useAccountItemCategoriesQuery";

type CategorySelectorProps = {
  type: TransactionType | "ALL";
  selectedCategoryId: string | undefined;
  onCategoryChange: (categoryId: string) => void;
};

function CategorySelector({
  type,
  selectedCategoryId,
  onCategoryChange,
}: CategorySelectorProps) {
  const { data: categories } = useAccountItemCategoriesQuery();

  const filteredCategories =
    type === "ALL"
      ? categories
      : categories?.filter((category) => category.type === type);

  return (
    <Select
      value={selectedCategoryId?.toString()}
      onValueChange={(value) => onCategoryChange(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="카테고리 선택" />
      </SelectTrigger>
      <SelectContent>
        {filteredCategories == null || filteredCategories.length === 0 ? (
          <span className="text-gray-400">카테고리 없음</span>
        ) : (
          filteredCategories?.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.displayedName}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

export default CategorySelector;
