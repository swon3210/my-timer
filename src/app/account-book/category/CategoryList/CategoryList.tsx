import { useState } from "react";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { Edit2, Trash2 } from "lucide-react";
import { Category } from "@/domains/account-book/categories/types";
import { useSetAccountItemCategories } from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { useDeleteAccountItemCategoryMutation } from "@/domains/account-book/categories/useDeleteAccountItemCategoryMutation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getIconById } from "@/utils/categoryIcons";
import CategoryEditModal from "@/components/category/CategoryEditModal";

const CategoryItem = ({ category }: { category: Category }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { mutateAsync: deleteCategory } =
    useDeleteAccountItemCategoryMutation();

  const { setAccountItemCategories } = useSetAccountItemCategories();

  const handleDeleteCategoryButtonClick = async () => {
    const confirmDelete = confirm(
      `"${category.displayedName}" 카테고리를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`
    );

    if (!confirmDelete) {
      return;
    }

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

      console.error("카테고리 삭제 중 오류가 발생했습니다:", error);
      alert("카테고리 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <motion.div
        key={category.id}
        className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="flex items-center space-x-3">
          {/* 카테고리 아이콘 */}
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
              const IconComponent = getIconById(category.icon).icon;
              return <IconComponent className="w-5 h-5" />;
            })()}
          </div>

          {/* 카테고리 정보 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">
                {category.displayedName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit2 className="w-4 h-4" />
            <span className="ml-1 hidden sm:inline">수정</span>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDeleteCategoryButtonClick}
            className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4" />
            <span className="ml-1 hidden sm:inline">삭제</span>
          </Button>
        </div>
      </motion.div>

      <CategoryEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={category}
      />
    </>
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

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          아직 카테고리가 없습니다
        </h3>
        <p className="text-gray-600">
          위의 폼을 사용하여 첫 번째 카테고리를 추가해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 수입 카테고리 */}
      {incomeCategories && incomeCategories.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-900">수입</h3>
            <span className="text-sm text-gray-500 bg-green-100 px-2 py-1 rounded-full">
              {incomeCategories.length}개
            </span>
          </div>
          <div className="space-y-2">
            {incomeCategories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      {/* 지출 카테고리 */}
      {expenseCategories && expenseCategories.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-900">지출</h3>
            <span className="text-sm text-gray-500 bg-red-100 px-2 py-1 rounded-full">
              {expenseCategories.length}개
            </span>
          </div>
          <div className="space-y-2">
            {expenseCategories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      {/* 투자 카테고리 */}
      {investmentCategories && investmentCategories.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-900">투자</h3>
            <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
              {investmentCategories.length}개
            </span>
          </div>
          <div className="space-y-2">
            {investmentCategories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      {/* FLEX 카테고리 */}
      {flexCategories && flexCategories.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-900">FLEX</h3>
            <span className="text-sm text-gray-500 bg-purple-100 px-2 py-1 rounded-full">
              {flexCategories.length}개
            </span>
          </div>
          <div className="space-y-2">
            {flexCategories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
