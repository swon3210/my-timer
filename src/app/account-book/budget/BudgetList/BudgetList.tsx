"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { Budget } from "@/domains/account-book/budgets/types";
import useBudgetFormDialogOverlay from "./useBudgetFormDialogOverlay";
import { useUpdateBudgetsMutation } from "@/domains/account-book/budgets/useUpdateBudgetsMutation";
import useAccountItemCategoriesQuery from "@/domains/account-book/useAccountItemCategoriesQuery";
import { useDeleteBudgetsMutation } from "@/domains/account-book/budgets/useDeleteBudgetsMutation";
import { useSetBudgetsQuery } from "@/domains/account-book/budgets/useSetBudgetsQuery";

function BudgetUpdateButton({ budget }: { budget: Budget }) {
  const { openBudgetFormDialog } = useBudgetFormDialogOverlay();

  const { mutateAsync: updateBudget } = useUpdateBudgetsMutation();
  const { setBudgets } = useSetBudgetsQuery();

  const handleClick = async () => {
    const formValues = await openBudgetFormDialog({
      defaultValues: {
        amount: budget.amount,
        categoryId: budget.categoryId,
        type: budget.type,
      },
    });

    try {
      setBudgets((budgets) =>
        budgets.map((prevBudget) =>
          prevBudget.id === budget.id
            ? { ...prevBudget, ...formValues }
            : prevBudget
        )
      );

      await updateBudget({
        id: budget.id,
        ...formValues,
      });
    } catch (error) {
      setBudgets((budgets) =>
        budgets.map((prevBudget) =>
          prevBudget.id === budget.id ? budget : prevBudget
        )
      );

      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Pencil className="w-4 h-4" />
    </Button>
  );
}

function BudgetDeleteButton({ budget }: { budget: Budget }) {
  const { mutateAsync: deleteBudget } = useDeleteBudgetsMutation();
  const { setBudgets } = useSetBudgetsQuery();

  const handleClick = async () => {
    try {
      setBudgets((budgets) =>
        budgets.filter((prevBudget) => prevBudget.id !== budget.id)
      );
      await deleteBudget(budget.id);
    } catch (error) {
      setBudgets((budgets) => [...budgets, budget]);
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick} variant="destructive">
      <Trash className="w-4 h-4" />
    </Button>
  );
}

function BudgetItem({ budget }: { budget: Budget }) {
  const { data: categories } = useAccountItemCategoriesQuery();

  const category = categories?.find(
    (category) => category.id === budget.categoryId
  );

  return (
    <motion.div
      key={budget.id}
      className="flex items-center space-x-4 bg-gray-50 p-4 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="flex-grow font-medium text-gray-700">
        {category?.displayedName}
      </span>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-500"></span>
        <span className="text-gray-500">
          ₩ {budget.amount.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <BudgetUpdateButton budget={budget} />
        <BudgetDeleteButton budget={budget} />
      </div>
    </motion.div>
  );
}

export default function BudgetList() {
  const { data: budgets } = useBudgetsQuery();

  const incomeBudgets = budgets?.filter((budget) => budget.type === "INCOME");
  const expenseBudgets = budgets?.filter((budget) => budget.type === "EXPENSE");

  return (
    <motion.div className="flex flex-col space-y-12">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">예산</h2>
        {incomeBudgets?.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">지출 계획</h2>
        {expenseBudgets?.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>
    </motion.div>
  );
}
