import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import CategoryItem from "./CategoryItem";
import EmptyCategoryList from "./EmptyCategoryList";

export default function CategoryList() {
  const { data: categories } = useAccountItemCategoriesQuery();

  const expenseCategories = categories?.filter(
    (category) => category.type === "EXPENSE"
  );
  const incomeCategories = categories?.filter(
    (category) => category.type === "INCOME"
  );

  if (!categories || categories.length === 0) {
    return <EmptyCategoryList />;
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
    </div>
  );
}
