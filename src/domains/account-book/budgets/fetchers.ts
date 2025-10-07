import { Budget } from "@/app/api/account-books/budgets/type";
import { axiosInstance } from "@/app/api/fetcher";

const API_PATH = "/api/account-books/budgets";

export const getBudgets = async () => {
  const response = await axiosInstance.get<Budget[]>(API_PATH);

  return response.data;
};

export const postBudget = async (
  budget: Omit<Budget, "id" | "createdAt" | "updatedAt">
) => {
  const response = await axiosInstance.post(API_PATH, { budget });
  return response.data;
};

export const patchBudget = async (
  budget: Omit<Budget, "createdAt" | "updatedAt">
) => {
  const response = await axiosInstance.patch(`${API_PATH}/${budget.id}`, {
    budget,
  });
  return response.data;
};

export const deleteBudget = async (budgetId: string) => {
  const response = await axiosInstance.delete(`${API_PATH}/${budgetId}`);
  return response.data;
};
