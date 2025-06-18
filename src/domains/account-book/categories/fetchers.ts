import { axiosInstance } from "@/lib/api";
import { Category } from "./types";

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
  icon,
}: {
  categoryId: string;
  displayedName: string;
  icon?: string;
}) => {
  const updateData: { displayedName: string; icon?: string } = {
    displayedName,
  };

  if (icon !== undefined) {
    updateData.icon = icon;
  }

  const response = await axiosInstance.patch<Category>(
    `/api/account-books/categories/${categoryId}`,
    updateData
  );
  return response.data;
};
