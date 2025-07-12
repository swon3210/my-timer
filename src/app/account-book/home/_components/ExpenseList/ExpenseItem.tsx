import { formatCurrency } from "@/utils/format";
import { getIconById } from "@/app/_utils/category";
import { BudgetStatusCategory } from "../../_hooks/useBudgetStatusCategories";
import { cn } from "@/lib/utils";

export default function ExpenseItem({
  category,
}: {
  category: BudgetStatusCategory;
}) {
  const progressPercentage =
    category.totalBudget > 0
      ? Math.min(
          (Math.abs(category.totalExpense) / category.totalBudget) * 100,
          100
        )
      : 0;

  const isOverBudget = category.totalExpense > category.totalBudget;

  const { icon: Icon } = getIconById(category.icon);

  return (
    <div
      className={`
          relative flex items-center p-4 rounded-xl bg-white/80 backdrop-blur-sm
          border border-gray-200/50 
          transition-all duration-300
        `}
    >
      <div
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg transition-transform duration-300",
          "bg-red-300"
        )}
      >
        {Icon && <Icon className="w-6 h-6" />}
      </div>

      <div className="flex-1 ml-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-md font-semibold text-gray-800">
              {category.displayedName}
            </h3>
          </div>

          <div className="text-right">
            <div
              className={`text-md font-bold ${
                isOverBudget ? "text-red-600" : "text-gray-800"
              }`}
            >
              {formatCurrency(category.totalExpense)}
            </div>
            <div className="text-xs text-gray-500">
              / {formatCurrency(category.totalBudget)}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isOverBudget
                  ? "bg-gradient-to-r from-red-400 to-red-600"
                  : `bg-gradient-to-r`
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div
            className={`text-xs font-medium ${
              isOverBudget ? "text-red-600" : "text-gray-600"
            }`}
          >
            {progressPercentage}% 사용
          </div>
          <div className="text-xs text-gray-500">
            남은 예산:{" "}
            {formatCurrency(
              Math.max(
                0,
                category.totalBudget - Math.abs(category.totalExpense)
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
