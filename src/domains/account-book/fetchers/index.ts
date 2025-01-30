import { axiosInstance } from "@/lib/api";
import { AccountItem, Category } from "../types";
import dayjs from "dayjs";
import { uniqueId } from "lodash";

type CreateAccountItemParams = Omit<
  AccountItem,
  "id" | "createdAt" | "updatedAt"
>;

export const postAccountItem = async (item: CreateAccountItemParams) => {
  const now = dayjs().toDate();
  const newItem = {
    ...item,
    id: uniqueId(),
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

export const updateAccountItem = async (
  itemId: string,
  updates: Partial<Omit<AccountItem, "id" | "createdAt" | "updatedAt">>
) => {
  const updatedData = {
    ...updates,
    updatedAt: dayjs().toISOString(),
  };

  const response = await axiosInstance.patch<AccountItem>(
    `/api/account-books/${itemId}`,
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

export const getAccountItemsCategories = async () => {
  const response = await axiosInstance.get<Category[]>(
    "/api/account-books/categories"
  );

  return response.data;
};

export const postAccountItemCategory = async (
  category: Omit<Category, "id" | "createdAt" | "updatedAt">
) => {
  const response = await axiosInstance.post<Category>(
    "/api/account-books/categories",
    category
  );
  return response.data;
};

export const deleteAccountItemCategory = async (categoryId: string) => {
  await axiosInstance.delete(`/api/account-books/categories/${categoryId}`);
};

export const updateAccountItemCategory = async ({
  categoryId,
  displayedName,
}: {
  categoryId: string;
  displayedName: string;
}) => {
  const response = await axiosInstance.patch<Category>(
    `/api/account-books/categories/${categoryId}`,
    {
      displayedName,
    }
  );
  return response.data;
};
