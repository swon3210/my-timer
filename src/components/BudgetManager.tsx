"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useFinance } from "./FinanceContext";

export default function BudgetManager() {
  const { categories, budgets, setBudget } = useFinance();

  const handleSetBudget = (categoryId: string, amount: string) => {
    setBudget(categoryId, Number(amount));
  };

  return (
    <motion.div
      className="space-y-6 bg-white rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {categories
        .filter((category) => category.type === "expense")
        .map((category) => {
          const budget = budgets.find((b) => b.categoryId === category.id);
          return (
            <motion.div
              key={category.id}
              className="flex items-center space-x-4 bg-gray-50 p-4 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="flex-grow font-medium text-gray-700">
                {category.name}
              </span>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">₩</span>
                <Input
                  type="number"
                  value={budget?.amount || ""}
                  onChange={(e) => handleSetBudget(category.id, e.target.value)}
                  placeholder="예산 금액"
                  className="pl-8 w-40"
                />
              </div>
              <Button
                onClick={() =>
                  handleSetBudget(
                    category.id,
                    budget?.amount?.toString() || "0"
                  )
                }
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Save className="w-4 h-4" />
              </Button>
            </motion.div>
          );
        })}
    </motion.div>
  );
}
