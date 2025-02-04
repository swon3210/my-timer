import { ArrowDownCircle, ArrowUpCircle, TrendingUp } from "lucide-react";
import { AccountItem } from "@/domains/account-book/types";
import useSubTab from "../useSubTab";
import useDateAtom from "../_atom/useDateAtom";
import dayjs from "dayjs";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";

type ExpenseTotalProps = {
  accountItems: AccountItem[];
};

export default function ExpenseTotal({ accountItems }: ExpenseTotalProps) {
  const { subTab } = useSubTab();

  const { date } = useDateAtom();

  const { data: budgets } = useBudgetsQuery();

  const filteredAccountItems = accountItems.filter((item) => {
    if (subTab === "weekly") {
      return dayjs(item.date).isSame(date, "week");
    }

    if (subTab === "monthly") {
      return dayjs(item.date).isSame(date, "month");
    }

    return dayjs(item.date).isSame(date, "year");
  });

  const totalBudget =
    budgets
      ?.filter((budget) => {
        if (subTab === "weekly") {
          return budget.type === "EXPENSE" || budget.type === "FLEX";
        }

        return budget.type === "INCOME";
      })
      .reduce((acc, budget) => {
        if (subTab === "weekly" && dayjs(budget.date).isSame(date, "week")) {
          return acc + budget.amount;
        }

        if (subTab === "monthly" && dayjs(budget.date).isSame(date, "month")) {
          return acc + budget.amount;
        }

        if (subTab === "yearly" && dayjs(budget.date).isSame(date, "year")) {
          return acc + budget.amount;
        }

        return acc;
      }, 0) ?? 0;

  const totalExpense = filteredAccountItems
    .filter((item) => item.type === "EXPENSE")
    .reduce((acc, item) => acc + item.amount, 0);

  const restBudget = totalBudget + totalExpense;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-green-800 mb-2 flex items-center">
          <ArrowUpCircle className="mr-2" /> 총 예산
        </h3>
        <p className="text-xl font-bold text-green-600">
          ₩ {totalBudget.toLocaleString()}
        </p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-red-800 mb-2 flex items-center">
          <ArrowDownCircle className="mr-2" /> 총 지출
        </h3>
        <p className="text-xl font-bold text-red-600">
          ₩ {totalExpense.toLocaleString()}
        </p>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-blue-800 mb-2 flex items-center">
          <TrendingUp className="mr-2" /> 남은 예산
        </h3>
        <p className="text-xl font-bold text-blue-600">
          ₩ {restBudget.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
