import { axiosInstance } from "@/app/api/fetcher";
import dayjs from "dayjs";
import { Transaction } from "@/app/api/account-books/transactions/types";

export const getSavings = async () => {
  const response = await axiosInstance.get<Transaction[]>(
    "/api/account-books/transactions"
  );

  const totalSavings = response.data.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const thisMonthSavings = response.data.reduce((acc, item) => {
    const itemDate = dayjs(item.date);
    if (itemDate.isSame(dayjs(), "month")) {
      return acc + item.amount;
    }
    return acc;
  }, 0);

  const lastMonthSavings = response.data.reduce((acc, item) => {
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
