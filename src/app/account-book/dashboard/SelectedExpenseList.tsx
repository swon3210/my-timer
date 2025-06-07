"use client";

import { motion } from "framer-motion";
import {
  Utensils,
  ShoppingBag,
  Heart,
  Car,
  Home,
  Coffee,
  Gamepad2,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

interface ExpenseCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  actualAmount: number;
  budgetAmount: number;
  color: string;
}

const expenseCategories: ExpenseCategory[] = [
  {
    id: "food",
    name: "식비",
    icon: <Utensils className="w-5 h-5" />,
    actualAmount: 350000,
    budgetAmount: 400000,
    color: "bg-blue-500",
  },
  {
    id: "shopping",
    name: "쇼핑",
    icon: <ShoppingBag className="w-5 h-5" />,
    actualAmount: 280000,
    budgetAmount: 200000,
    color: "bg-pink-500",
  },
  {
    id: "date",
    name: "데이트",
    icon: <Heart className="w-5 h-5" />,
    actualAmount: 150000,
    budgetAmount: 200000,
    color: "bg-red-500",
  },
  {
    id: "transport",
    name: "교통비",
    icon: <Car className="w-5 h-5" />,
    actualAmount: 120000,
    budgetAmount: 150000,
    color: "bg-green-500",
  },
  {
    id: "housing",
    name: "주거비",
    icon: <Home className="w-5 h-5" />,
    actualAmount: 800000,
    budgetAmount: 900000,
    color: "bg-yellow-500",
  },
  {
    id: "cafe",
    name: "카페",
    icon: <Coffee className="w-5 h-5" />,
    actualAmount: 80000,
    budgetAmount: 100000,
    color: "bg-amber-500",
  },
];

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString()}`;
}

function CategoryRow({
  category,
  index,
}: {
  category: ExpenseCategory;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const progressPercentage = Math.min(
    (category.actualAmount / category.budgetAmount) * 100,
    100
  );
  const isOverBudget = category.actualAmount > category.budgetAmount;

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
        ${category.color} text-white shadow-lg
        ${isHovered ? "scale-110" : "scale-100"}
        transition-transform duration-300
      `}
      >
        {category.icon}
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
                  : `${category.color.replace(
                      "bg-",
                      "bg-gradient-to-r from-"
                    )}-400 ${category.color.replace("bg-", "to-")}-600`
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

export default function SelectedExpenseList() {
  const totalActual = expenseCategories.reduce(
    (sum, cat) => sum + cat.actualAmount,
    0
  );
  const totalBudget = expenseCategories.reduce(
    (sum, cat) => sum + cat.budgetAmount,
    0
  );
  const overallProgress = (totalActual / totalBudget) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 shadow-xl"
    >
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between mb-4"
        >
          <h2 className="text-lg font-bold text-gray-800">지출 현황</h2>
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
                : "bg-gradient-to-r from-blue-400 to-indigo-600"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(overallProgress, 100)}%` }}
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
          <CategoryRow key={category.id} category={category} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
