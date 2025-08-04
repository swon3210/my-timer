import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { useTransactionsQuery } from "@/domains/account-book/transactions/useTransactionsQuery";
import useTransactionCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { Category } from "@/app/api/account-books/categories/types";
import { TabType } from "../_components/ExpenseTabs/ExpenseTabs";
import dayjs from "dayjs";
import { useMemo } from "react";

export type BudgetStatusCategory = Category & {
  totalExpense: number;
  totalBudget: number;
};

export default function useBudgetStatusCategories(
  activeTab: TabType
): BudgetStatusCategory[] {
  const { data: transactionCategories = [] } = useTransactionCategoriesQuery();
  const { data: transactions = [] } = useTransactionsQuery();
  const { data: budgets = [] } = useBudgetsQuery();

  const filteredBudgets = useMemo(() => {
    const today = dayjs();

    if (activeTab === "yearly") {
      const yearlyBudgets = budgets?.filter(
        (budget) =>
          budget.targetDate.year != null &&
          budget.targetDate.month == null &&
          budget.targetDate.weekPeriod == null
      );

      return yearlyBudgets?.filter(
        (budget) => budget.targetDate.year === today.year()
      );
    }

    if (activeTab === "monthly") {
      const monthlyBudgets = budgets?.filter(
        (budget) =>
          budget.targetDate.year != null &&
          budget.targetDate.month != null &&
          budget.targetDate.weekPeriod == null
      );

      return monthlyBudgets?.filter(
        (budget) =>
          budget.targetDate.year === today.year() &&
          budget.targetDate.month === today.month()
      );
    }

    if (activeTab === "weekly") {
      const weeklyBudgets = budgets?.filter(
        (budget) =>
          budget.targetDate.year != null &&
          budget.targetDate.month != null &&
          budget.targetDate.weekPeriod != null
      );

      return weeklyBudgets?.filter((budget) => {
        const [start, end] = budget.targetDate.weekPeriod ?? [];

        return (
          budget.targetDate.year === today.year() &&
          budget.targetDate.month === today.month() &&
          today.date() >= start &&
          today.date() <= end
        );
      });
    }

    return budgets;
  }, [budgets, activeTab]);

  const filteredTransactions = useMemo(() => {
    const today = dayjs();

    if (activeTab === "yearly") {
      return transactions?.filter(
        (transaction) => dayjs(transaction.date).year() === today.year()
      );
    }

    if (activeTab === "monthly") {
      return transactions?.filter(
        (transaction) =>
          dayjs(transaction.date).year() === today.year() &&
          dayjs(transaction.date).month() === today.month()
      );
    }

    if (activeTab === "weekly") {
      return transactions?.filter((transaction) => {
        const firstDayOfWeek = today.startOf("week");
        const lastDayOfWeek = today.endOf("week");

        return (
          dayjs(transaction.date).isAfter(firstDayOfWeek) &&
          dayjs(transaction.date).isBefore(lastDayOfWeek)
        );
      });
    }
  }, [transactions, activeTab]);

  const expenseCategories = transactionCategories?.filter(
    (category) => category.type === "EXPENSE"
  );

  return (
    expenseCategories?.map((category) => {
      const categoryTransactions = filteredTransactions?.filter(
        (transaction) => transaction.categoryId === category.id
      );

      const totalExpense = Math.abs(
        categoryTransactions?.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        ) ?? 0
      );
      const totalBudget = filteredBudgets?.find(
        (budget) => budget.categoryId === category.id
      )?.amount;

      return {
        ...category,
        totalExpense: totalExpense ?? 0,
        totalBudget: totalBudget ?? 0,
      };
    }) ?? []
  );
}
