import { Budget } from "@/app/api/account-books/budgets/type";

export const getBudgetTargetDateText = (targetDate: Budget["targetDate"]) => {
  if (targetDate.month) {
    return `${targetDate.year}년 ${targetDate.month + 1}월`;
  }

  return `${targetDate.year}년`;
};
