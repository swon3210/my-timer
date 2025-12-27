import { Goal } from "@/domains/account-book/goal/types";
import { Transaction } from "@/domains/account-book/transactions/types";

export const compareGoalByPriority = (a: Goal, b: Goal) => {
  if (a.priority !== b.priority) {
    return a.priority.localeCompare(b.priority);
  }
  return 0;
};

export const compareGoalByDueDate = (a: Goal, b: Goal) => {
  if (a.endAt !== b.endAt) {
    return new Date(a.endAt).getTime() - new Date(b.endAt).getTime();
  }
  return 0;
};

const getGoalProgress = (goal: Goal, transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "INCOME" &&
        transaction.categoryId === goal.categoryId
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return totalIncome / goal.targetAmount;
};

export const compareGoalByProgress = ({
  a,
  b,
  transactions,
}: {
  a: Goal;
  b: Goal;
  transactions: Transaction[];
}) => {
  const aProgress = getGoalProgress(a, transactions);
  const bProgress = getGoalProgress(b, transactions);

  return aProgress - bProgress;
};
