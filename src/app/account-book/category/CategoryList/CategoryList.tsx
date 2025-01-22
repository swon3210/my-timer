import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { Edit2, Trash2 } from "lucide-react";
import { Category } from "@/domains/account-book/categories/types";
import useUpdateAccountItemCategoryMutation from "@/domains/account-book/categories/useUpdateAccountItemCategoryMutation";
import { useSetAccountItemCategories } from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { useDeleteAccountItemCategoryMutation } from "@/domains/account-book/categories/useDeleteAccountItemCategoryMutation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CategoryItem = ({ category }: { category: Category }) => {
  const { mutateAsync: deleteCategory } =
    useDeleteAccountItemCategoryMutation();

  const { mutateAsync: updateCategory } =
    useUpdateAccountItemCategoryMutation();

  const { setAccountItemCategories } = useSetAccountItemCategories();

  const handleUpdateCategoryButtonClick = async () => {
    const categoryDisplayedName = prompt("새 카테고리 이름을 입력하세요");

    if (!categoryDisplayedName) {
      return;
    }

    setAccountItemCategories((categories) => {
      return categories.map((prevCategory) => {
        if (prevCategory.id === category.id) {
          return {
            ...prevCategory,
            displayedName: categoryDisplayedName,
          };
        }
        return prevCategory;
      });
    });

    try {
      await updateCategory({
        categoryId: category.id,
        displayedName: categoryDisplayedName,
      });
    } catch (error) {
      setAccountItemCategories((categories) => {
        return categories.map((prevCategory) => {
          if (prevCategory.id === category.id) {
            return {
              ...prevCategory,
              displayedName: category.displayedName,
            };
          }
          return prevCategory;
        });
      });

      console.error(error);
    }
  };

  const handleDeleteCategoryButtonClick = async () => {
    try {
      setAccountItemCategories((categories) => {
        return categories.filter(
          (prevCategory) => prevCategory.id !== category.id
        );
      });

      await deleteCategory(category.id);
    } catch (error) {
      setAccountItemCategories((categories) => {
        return [...categories, category];
      });

      console.error(error);
    }
  };

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
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleUpdateCategoryButtonClick}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={handleDeleteCategoryButtonClick}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export default function CategoryList() {
  const { data: categories } = useAccountItemCategoriesQuery();

  const expenseCategories = categories?.filter(
    (category) => category.type === "EXPENSE"
  );
  const incomeCategories = categories?.filter(
    (category) => category.type === "INCOME"
  );

  const investmentCategories = categories?.filter(
    (category) => category.type === "INVESTMENT"
  );

  const flexCategories = categories?.filter(
    (category) => category.type === "FLEX"
  );

  return (
    <div className="flex flex-col space-y-12">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">수입</h2>
        {incomeCategories?.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">지출</h2>
        {expenseCategories?.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">투자</h2>
        {investmentCategories?.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">FLEX</h2>
        {flexCategories?.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
