"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TabType } from "./_components/ExpenseTabs/ExpenseTabs";
import { formatCurrency } from "@/utils/format";
import useBudgetStatusCategories from "./_hooks/useBudgetStatusCategories";
import { getIconById } from "@/app/_utils/category";

interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  actualAmount: number;
  budgetAmount: number;
}

function CategoryRow({
  category,
  index,
}: {
  category: ExpenseCategory;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const progressPercentage =
    category.budgetAmount > 0
      ? Math.min((category.actualAmount / category.budgetAmount) * 100, 100)
      : 0;

  const isOverBudget = category.actualAmount > category.budgetAmount;

  const Icon = getIconById(category.icon).icon;
  const color = getIconById(category.icon).color;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative flex items-center p-4 rounded-xl bg-white/80 backdrop-blur-sm
        border border-gray-200/50 hover:border-gray-300/70
        hover:bg-white/90 transition-all duration-300
        hover:shadow-lg hover:shadow-gray-200/30
        ${isHovered ? "scale-[1.02]" : ""}
      `}
    >
      <div
        className={`
        flex items-center justify-center w-12 h-12 rounded-full
        text-white shadow-lg
        ${isHovered ? "scale-110" : "scale-100"}
        transition-transform duration-300
      `}
        style={{ backgroundColor: color }}
      >
        {Icon && <Icon className="w-6 h-6" />}
      </div>

      <div className="flex-1 ml-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-md font-semibold text-gray-800">
              {category.name}
            </h3>
            {isOverBudget && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium"
              >
                예산 초과
              </motion.div>
            )}
          </div>

          <div className="text-right">
            <div
              className={`text-md font-bold ${
                isOverBudget ? "text-red-600" : "text-gray-800"
              }`}
            >
              {formatCurrency(category.actualAmount)}
            </div>
            <div className="text-xs text-gray-500">
              / {formatCurrency(category.budgetAmount)}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                isOverBudget
                  ? "bg-gradient-to-r from-red-400 to-red-600"
                  : `bg-gradient-to-r`
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{
                duration: 1,
                delay: index * 0.1 + 0.3,
                ease: "easeOut",
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div
            className={`text-xs font-medium ${
              isOverBudget ? "text-red-600" : "text-gray-600"
            }`}
          >
            {progressPercentage.toFixed(1)}% 사용
          </div>
          <div className="text-xs text-gray-500">
            남은 예산:{" "}
            {formatCurrency(
              Math.max(0, category.budgetAmount - category.actualAmount)
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedExpenseList({
  activeTab,
}: {
  activeTab: TabType;
}) {
  const expenseCategories = useBudgetStatusCategories();

  const totalActual = expenseCategories.reduce(
    (sum, category) => sum + category.totalExpense,
    0
  );

  const totalBudget = expenseCategories.reduce(
    (sum, category) => sum + category.totalBudget,
    0
  );

  const overallProgress = Math.min((totalActual / totalBudget) * 100, 100);

  console.log({
    totalActual,
    totalBudget,
    overallProgress,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-green-50 to-emerald-200 rounded-3xl p-6 shadow-lg shadow-primary/20"
    >
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between mb-4"
        >
          <h2 className="text-lg font-bold text-gray-800">
            지출 현황
            <br />
            <span className="text-sm text-gray-600">(2월 10일 - 2월 16일)</span>
          </h2>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">
              {formatCurrency(totalActual)}
            </div>
            <div className="text-sm text-gray-600">
              / {formatCurrency(totalBudget)}
            </div>
          </div>
        </motion.div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <motion.div
            className={`h-full rounded-full ${
              overallProgress > 100
                ? "bg-gradient-to-r from-red-400 to-red-600"
                : "bg-gradient-to-r from-green-400 to-emerald-600"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-between items-center text-sm"
        >
          <span
            className={`font-medium ${
              overallProgress > 100 ? "text-red-600" : "text-gray-700"
            }`}
          >
            전체 {overallProgress.toFixed(1)}% 사용
          </span>
          <span className="text-gray-600">
            남은 예산: {formatCurrency(Math.max(0, totalBudget - totalActual))}
          </span>
        </motion.div>
      </div>

      <div className="space-y-4">
        {expenseCategories.map((category, index) => (
          <CategoryRow
            key={category.id}
            category={{
              ...category,
              name: category.displayedName,
              icon: category.icon,
              actualAmount: category.totalExpense,
              budgetAmount: category.totalBudget,
            }}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
