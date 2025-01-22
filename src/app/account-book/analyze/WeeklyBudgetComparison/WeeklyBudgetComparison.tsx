"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useFinance } from "../../../../components/FinanceContext";

interface ExpenseMap {
  [key: string]: number;
}

export default function WeeklyBudgetComparison() {
  const { transactions, categories, budgets } = useFinance();

  const weeklyExpenses = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const endOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (6 - now.getDay())
    );

    return transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          transactionDate >= startOfWeek &&
          transactionDate <= endOfWeek &&
          t.amount < 0
        );
      })
      .reduce<ExpenseMap>((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = 0;
        }
        acc[t.category] += Math.abs(t.amount);
        return acc;
      }, {});
  }, [transactions]);

  const comparisonData = useMemo(() => {
    return categories
      .filter((category) => category.type === "EXPENSE")
      .map((category) => {
        const budget = budgets.find((b) => b.categoryId === category.id);
        const weeklyExpense = weeklyExpenses[category.id] || 0;
        return {
          category: category.name,
          budgetAmount: budget ? budget.amount : 0,
          actualAmount: weeklyExpense,
          difference: (budget ? budget.amount : 0) - weeklyExpense,
        };
      });
  }, [categories, budgets, weeklyExpenses]);

  return (
    <motion.div
      className="space-y-6 bg-white rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                카테고리
              </th>
              <th scope="col" className="px-6 py-3">
                예산
              </th>
              <th scope="col" className="px-6 py-3">
                실제 지출
              </th>
              <th scope="col" className="px-6 py-3">
                차이
              </th>
              <th scope="col" className="px-6 py-3">
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <motion.tr
                key={item.category}
                className="bg-white border-b"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.category}
                </th>
                <td className="px-6 py-4">
                  ₩{item.budgetAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  ₩{item.actualAmount.toLocaleString()}
                </td>
                <td
                  className={`px-6 py-4 ${
                    item.difference >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ₩{Math.abs(item.difference).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {item.difference >= 0 ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <AlertTriangle className="text-red-500" />
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
