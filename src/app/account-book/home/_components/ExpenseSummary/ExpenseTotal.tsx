import dayjs from "dayjs";
import { useBudgetsQuery } from "@/domains/account-book/budgets/useBudgetsQuery";
import { useTransactionsQuery } from "@/domains/account-book/transactions/useTransactionsQuery";
import IncomeIcon from "@/app/assets/icons/ic_income";
import ExpenseIcon from "@/app/assets/icons/ic_expense";
import CheckIcon from "@/app/assets/icons/ic_check";

function ProgressBar({ total, used }: { total: number; used: number }) {
  const remaining = total - used;

  return (
    <div className="flex w-full h-7 bg-primary-heavy rounded-full overflow-hidden">
      <span className="grow flex justify-center items-center text-secondary text-sm font-bold">
        {((used / total) * 100).toFixed(0)}%
      </span>
      <div
        className="h-full bg-white rounded-full flex justify-end items-center pr-4"
        style={{ width: `${(100 - (used / total) * 100).toFixed(0)}%` }}
      >
        <span className="text-primary-heavy font-bold text-sm">
          ₩{Math.abs(remaining).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function ExpenseTotal() {
  const { data: transactions = [] } = useTransactionsQuery();

  const { data: budgets = [] } = useBudgetsQuery();

  const today = dayjs();

  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const totalBudget =
    budgets
      .filter((budget) => {
        return (
          budget.targetDate.year === currentYear &&
          budget.targetDate.month === currentMonth
        );
      })
      .reduce((acc, budget) => acc + budget.amount, 0) ?? 0;

  const totalExpense = transactions
    .filter((item) => item.type === "EXPENSE" || item.type === "FLEX")
    .reduce((acc, item) => {
      if (dayjs(item.date).isSame(today, "month")) {
        return acc + item.amount;
      }

      return acc;
    }, 0);

  const percentage = Math.abs(totalExpense / totalBudget) * 100;

  const remainingDays = dayjs().endOf("month").diff(today, "day");

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center px-4">
        <div className="flex-1 flex flex-col">
          <p className="text-sm flex items-center gap-2">
            <IncomeIcon />
            {currentMonth + 1}월 예산
          </p>
          <p className="text-lg font-bold text-white">
            ₩ {totalBudget.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-sm flex items-center gap-2">
            <ExpenseIcon />
            {currentMonth + 1}월 지출
          </p>
          <p className="text-lg font-bold text-blue-600">
            ₩ {Math.abs(totalExpense).toLocaleString()}
          </p>
        </div>
      </div>

      <ProgressBar total={totalBudget} used={totalExpense} />

      <ul className="flex flex-col gap-1 px-3">
        <li className="flex items-center gap-2">
          <CheckIcon />
          <p className="text-xs">총 예산의 {percentage.toFixed(0)}% 사용됨</p>
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />
          <p className="text-xs">
            앞으로 {remainingDays}일 남았습니다. 화이팅!
          </p>
        </li>
      </ul>
    </div>
  );
}
