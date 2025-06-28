"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { Budget } from "@/domains/account-book/budgets/types";
import { useUpdateBudgetsMutation } from "@/domains/account-book/budgets/useUpdateBudgetsMutation";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { useDeleteBudgetsMutation } from "@/domains/account-book/budgets/useDeleteBudgetsMutation";
import { useSetBudgetsQuery } from "@/domains/account-book/budgets/useSetBudgetsQuery";
import useOutcomeFormDialogOverlay from "../useOutcomeFormDialogOverlay";
import WeeklyOutcomeAddButton from "./WeeklyOutcomeAddButton";
import WeekManager from "./WeekManager";
import useDateAtom from "../_atom/useDateAtom";
import dayjs from "dayjs";

function BudgetUpdateButton({ budget }: { budget: Budget }) {
  const { openOutcomeFormDialog } = useOutcomeFormDialogOverlay();

  const { mutateAsync: updateBudget } = useUpdateBudgetsMutation();
  const { setBudgets } = useSetBudgetsQuery();

  const handleClick = async () => {
    const formValues = await openOutcomeFormDialog({
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
        ...budget,
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
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

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
  const { date } = useDateAtom();

  const { data: budgets } = useBudgetsQuery();

  const expenseBudgets = budgets?.filter(
    (budget) =>
      budget.type === "EXPENSE" &&
      dayjs(budget.date).isSame(dayjs(date), "year") &&
      dayjs(budget.date).isSame(dayjs(date), "month") &&
      dayjs(budget.date).isSame(dayjs(date), "week")
  );
  const flexBudgets = budgets?.filter(
    (budget) =>
      budget.type === "FLEX" &&
      dayjs(budget.date).isSame(dayjs(date), "year") &&
      dayjs(budget.date).isSame(dayjs(date), "month") &&
      dayjs(budget.date).isSame(dayjs(date), "week")
  );

  const totalExpense =
    expenseBudgets?.reduce((acc, budget) => acc + budget.amount, 0) ?? 0;

  const totalFlex =
    flexBudgets?.reduce((acc, budget) => acc + budget.amount, 0) ?? 0;

  // const saveAmount = Math.round(
  //   totalIncome -
  //     totalExpense -
  //     (flexAmount ?? 0) -
  //     (totalIncome * (investmentPercentage ?? 0)) / 100
  // );

  // const investmentAmount = Math.round(
  //   (totalIncome * (investmentPercentage ?? 0)) / 100
  // );

  // const handleInvestmentPercentageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = parseInt(event.target.value);

  //   if (value > 100) {
  //     return;
  //   }

  //   setInvestmentPercentage(Number.isNaN(value) ? undefined : value);
  // };

  // const handleFlexAmountChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = parseInt(event.target.value);

  //   if (value > 100) {
  //     return;
  //   }

  //   setFlexAmount(Number.isNaN(value) ? undefined : value);
  // };

  return (
    <motion.div className="flex flex-col space-y-12">
      <div className="flex justify-between items-center">
        <WeekManager />
        <WeeklyOutcomeAddButton />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          고정 지출 ({totalExpense?.toLocaleString()}원)
        </h2>
        {expenseBudgets?.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          FLEX 지출 ({totalFlex?.toLocaleString()}원)
        </h2>
        {flexBudgets?.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>

      {/* <div className="flex flex-col items-end space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-end">
              <h2 className="text-lg font-semibold whitespace-nowrap">
                목표 투자 수익률
              </h2>
              <p className="text-sm text-gray-500">
                (투자 수익 / 투자 금액) * 100
              </p>
            </div>
            <Input
              type="number"
              placeholder="%"
              maxLength={3}
              value={investmentPercentage}
              onChange={handleInvestmentPercentageChange}
              className="w-48"
            />
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-end">
              <h2 className="text-lg font-semibold whitespace-nowrap">
                목표 FLEX 비율
              </h2>
              <p className="text-sm text-gray-500">
                FLEX 금액 / (전체 수입 - 전체 지출 - 투자 금액) * 100
              </p>
            </div>
            <Input
              type="number"
              placeholder="%"
              value={flexAmount}
              max={
                totalIncome -
                totalExpense -
                (totalIncome * (investmentPercentage ?? 0)) / 100
              }
              onChange={handleFlexAmountChange}
              className="w-48"
            />
          </div>
        </div>

        <div className="flex items-end flex-col space-y-4 mr-4">
          <span className="text-lg font-semibold">
            예상 저축 금액 : {saveAmount.toLocaleString()}원
          </span>

          <span className="text-lg font-semibold">
            예상 투자 수익 : {investmentAmount.toLocaleString()}원
          </span>

          <span
            className={cn(
              "text-lg font-semibold",
              saveAmount < 0 && "text-red-500"
            )}
          >
            예상 총 저축액 : {saveAmount.toLocaleString()}원
          </span>
        </div> */}
    </motion.div>
  );
}
