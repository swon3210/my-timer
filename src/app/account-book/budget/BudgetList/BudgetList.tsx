"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { Budget } from "@/domains/account-book/budgets/types";
import useBudgetFormDialogOverlay from "./useBudgetFormDialogOverlay";
import { useUpdateBudgetsMutation } from "@/domains/account-book/budgets/useUpdateBudgetsMutation";

function BudgetUpdateButton({ budget }: { budget: Budget }) {
  const { openBudgetFormDialog } = useBudgetFormDialogOverlay();

  const { mutateAsync: updateBudget } = useUpdateBudgetsMutation();

  const handleClick = async () => {
    const formValues = await openBudgetFormDialog({
      defaultValues: {
        name: budget.name,
        amount: budget.amount,
        categoryId: budget.categoryId,
      },
    });

    try {
      await updateBudget({
        id: budget.id,
        ...formValues,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick}>
      <Pencil className="w-4 h-4" />
    </Button>
  );
}

function BudgetItem({ budget }: { budget: Budget }) {
  return (
    <motion.div
      key={budget.id}
      className="flex items-center space-x-4 bg-gray-50 p-4 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="flex-grow font-medium text-gray-700">{budget.name}</span>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-500"></span>
        <span className="text-gray-500">
          ₩ {budget.amount.toLocaleString()}
        </span>
      </div>
      <BudgetUpdateButton budget={budget} />
    </motion.div>
  );
}

export default function BudgetList() {
  const { data: budgets } = useBudgetsQuery();

  return (
    <motion.div
      className="space-y-4 bg-white rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {budgets?.map((budget) => (
        <BudgetItem key={budget.id} budget={budget} />
      ))}
    </motion.div>
  );
}
