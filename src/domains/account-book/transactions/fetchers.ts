import { axiosInstance } from "@/lib/api";
import dayjs from "dayjs";
import {
  CreateTransactionRequestParams,
  UpdateTransactionRequestParams,
  Transaction,
} from "@/app/api/account-books/transactions/types";

export const postTransaction = async (item: CreateTransactionRequestParams) => {
  const response = await axiosInstance.post<Transaction>(
    "/api/account-books/transactions",
    item
  );

  return response.data;
};

export const getTransactions = async () => {
  const response = await axiosInstance.get<Transaction[]>(
    "/api/account-books/transactions"
  );

  return response.data
    .map((item) => ({
      ...item,
    }))
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
};

export const updateTransaction = async ({
  id,
  transaction,
}: UpdateTransactionRequestParams & { id: string }) => {
  const response = await axiosInstance.patch<Transaction>(
    `/api/account-books/transactions/${id}`,
    {
      transaction,
    }
  );

  return response.data;
};

export const deleteTransaction = async (itemId: string) => {
  await axiosInstance.delete(`/api/account-books/transactions/${itemId}`);
};

export const getTransactionsByPeriod = async (
  startDate: Date,
  endDate: Date
) => {
  const items = await getTransactions();
  return items.filter((item) => {
    const itemDate = dayjs(item.date);
    return itemDate.isAfter(startDate) && itemDate.isBefore(endDate);
  });
};
