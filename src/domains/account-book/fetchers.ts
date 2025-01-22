import { axiosInstance } from "@/lib/api";
import { AccountItem } from "./types";
import dayjs from "dayjs";

type CreateAccountItemParams = Omit<
  AccountItem,
  "id" | "createdAt" | "updatedAt"
>;

export const postAccountItem = async (item: CreateAccountItemParams) => {
  const now = dayjs().toDate();
  const newItem = {
    ...item,
    createdAt: now,
    updatedAt: now,
  };

  const response = await axiosInstance.post<AccountItem>(
    "/api/account-books",
    newItem
  );
  return {
    ...response.data,
    date: dayjs(response.data.date).toDate(),
    createdAt: dayjs(response.data.createdAt).toDate(),
    updatedAt: dayjs(response.data.updatedAt).toDate(),
  };
};

export const getAccountItems = async () => {
  const response = await axiosInstance.get<AccountItem[]>("/api/account-books");

  return response.data
    .map((item) => ({
      ...item,
    }))
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
};

export const updateAccountItem = async (item: AccountItem) => {
  const updatedData = {
    ...item,
    updatedAt: dayjs().toISOString(),
  };

  const response = await axiosInstance.patch<AccountItem>(
    `/api/account-books/${item.id}`,
    updatedData
  );
  return {
    ...response.data,
    date: dayjs(response.data.date).toDate(),
    createdAt: dayjs(response.data.createdAt).toDate(),
    updatedAt: dayjs(response.data.updatedAt).toDate(),
  };
};

export const deleteAccountItem = async (itemId: string) => {
  await axiosInstance.delete(`/api/account-books/${itemId}`);
};

export const getAccountItemsByPeriod = async (
  startDate: Date,
  endDate: Date
) => {
  const items = await getAccountItems();
  return items.filter((item) => {
    const itemDate = dayjs(item.date);
    return itemDate.isAfter(startDate) && itemDate.isBefore(endDate);
  });
};
