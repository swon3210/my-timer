import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import useDateAtom from "../_atom/useDateAtom";
import useSubTab from "../useSubTab";
import dayjs from "dayjs";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { useTransactionsQuery } from "@/domains/account-book/useTransactionsQuery";
import { TransactionType } from "@/app/api/account-books/transactions/types";
import { Transaction } from "@/app/api/account-books/transactions/types";

function ExpenseTableItem({
  type,
  categoryDisplayedName,
  amount,
  restBudgetAmount,
  index,
}: {
  type: TransactionType;
  categoryDisplayedName: string;
  amount: number;
  restBudgetAmount?: number;
  index: number;
}) {
  return (
    <motion.tr
      className="bg-white border-b"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {categoryDisplayedName}
      </td>
      {/* <td className={cn("px-6 py-4", type === "INCOME" && "text-green-500")}>
        {type === "INCOME" ? `${amount} 원` : `-`}
      </td> */}
      <td className={cn("px-6 py-4", type === "EXPENSE" && "text-red-500")}>
        {type === "EXPENSE" && amount !== 0
          ? `${amount.toLocaleString()} 원`
          : `-`}
      </td>
      <td className={`px-6 py-4 text-blue-500`}>
        {restBudgetAmount ? `${restBudgetAmount.toLocaleString()} 원` : `-`}
      </td>
    </motion.tr>
  );
}

// const getCumulativeBalances = (accountItems: AccountItem[]) => {
//   return [...accountItems]
//     .reverse()
//     .reduce<number[]>((acc, item) => {
//       if (acc.length === 0) {
//         return [item.amount];
//       }

//       const balance = acc[acc.length - 1] + item.amount;

//       return [...acc, balance];
//     }, [])
//     .reverse();
// };

export default function ExpenseTable() {
  const { data: accountItems = [] } = useTransactionsQuery();

  const { subTab } = useSubTab();

  const { date } = useDateAtom();

  const { data: categories } = useAccountItemCategoriesQuery();

  const { data: budgets } = useBudgetsQuery();

  const filteredCategories = categories?.filter((category) => {
    return category.type === "EXPENSE" || category.type === "FLEX";
  });

  const filteredBudgets =
    budgets?.filter((budget) => {
      return budget.type === "EXPENSE" || budget.type === "FLEX";
    }) ?? [];

  const filteredAccountItems = accountItems.filter((item) => {
    if (subTab === "weekly") {
      return dayjs(item.date).isSame(date, "week");
    }

    if (subTab === "monthly") {
      return dayjs(item.date).isSame(date, "month");
    }

    return dayjs(item.date).isSame(date, "year");
  });

  const getTotalCategoryExpenseAmount = (
    categoryId: string,
    accountItems: Transaction[]
  ) => {
    return accountItems.reduce((acc, item) => {
      if (item.categoryId === categoryId) {
        return acc + item.amount;
      }

      return acc;
    }, 0);
  };
  // const cumulativeBalances = getCumulativeBalances(filteredAccountItems);

  return (
    <div className="bg-white rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                카테고리
              </th>
              {/* <th scope="col" className="px-6 py-3">
                수입
              </th> */}
              <th scope="col" className="px-6 py-3">
                지출
              </th>
              <th scope="col" className="px-6 py-3">
                남은 예산
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories?.map((category, index) => {
              const totalCategoryExpenseAmount = getTotalCategoryExpenseAmount(
                category.id,
                filteredAccountItems
              );

              const budgetAmount =
                filteredBudgets.find(
                  (budget) => budget.categoryId === category.id
                )?.amount ?? 0;

              const restBudgetAmount =
                budgetAmount + totalCategoryExpenseAmount;

              return (
                <ExpenseTableItem
                  key={category.id}
                  type={category.type}
                  categoryDisplayedName={category.displayedName}
                  amount={totalCategoryExpenseAmount}
                  restBudgetAmount={restBudgetAmount}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
