import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { useTransactionsQuery } from "@/domains/account-book/transactions/useTransactionsQuery";
import useTransactionCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";

export default function useBudgetStatusCategories() {
  const { data: transactionCategories } = useTransactionCategoriesQuery();
  const { data: transactions } = useTransactionsQuery();
  const { data: budgets } = useBudgetsQuery();

  const expenseCategories = transactionCategories?.filter(
    (category) => category.type === "EXPENSE"
  );

  return (
    expenseCategories?.map((category) => {
      const categoryTransactions = transactions?.filter(
        (transaction) => transaction.categoryId === category.id
      );
      const totalExpense = categoryTransactions?.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      const totalBudget = budgets?.find(
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
