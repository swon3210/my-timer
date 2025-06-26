import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Category } from "@/domains/account-book/categories/types";
import { useSetAccountItemCategories } from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { useDeleteAccountItemCategoryMutation } from "@/domains/account-book/categories/useDeleteAccountItemCategoryMutation";
import { Button } from "@/components/ui/button";
import { getIconById } from "@/app/account-book/category/CategoryForm/IconSelector/categoryIcons";
import CategoryEditModal from "@/components/category/CategoryEditModal";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
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
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {(() => {
              const IconComponent = getIconById(category.icon)?.icon;
              return IconComponent && <IconComponent className="w-5 h-5" />;
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
}

CategoryItem.Skeleton = function CategoryItemSkeleton() {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100" />
      </div>
    </div>
  );
};
