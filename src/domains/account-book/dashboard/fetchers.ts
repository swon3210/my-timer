import dayjs from "dayjs";
import { getTransactions } from "../transactions/fetchers";

export const getSavings = async () => {
  const transactions = await getTransactions();

  const totalSavings = transactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const thisMonthSavings = transactions.reduce((acc, item) => {
    const itemDate = dayjs(item.date);
    if (itemDate.isSame(dayjs(), "month")) {
      return acc + item.amount;
    }
    return acc;
  }, 0);

  const lastMonthSavings = transactions.reduce((acc, item) => {
    const itemDate = dayjs(item.date);
    if (itemDate.isSame(dayjs().subtract(1, "month"), "month")) {
      return acc + item.amount;
    }
    return acc;
  }, 0);

  return {
    totalSavings,
    thisMonthSavings,
    lastMonthSavings,
  };
};
