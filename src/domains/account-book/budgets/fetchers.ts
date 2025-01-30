import { axiosInstance } from "@/lib/api";
import { Budget } from "./types";

export const getBudgets = async () => {
  const response = await axiosInstance.get<Budget[]>(
    "/api/account-books/budget"
  );

  return response.data;
};

export const postBudget = async (budget: Omit<Budget, "id">) => {
  const response = await axiosInstance.post(
    "/api/account-books/budget",
    budget
  );
  return response.data;
};

export const patchBudget = async (budget: Budget) => {
  const response = await axiosInstance.patch(
    `/api/account-books/budget/${budget.id}`,
    budget
  );
  return response.data;
};

export const deleteBudget = async (budgetId: string) => {
  const response = await axiosInstance.delete(
    `/api/account-books/budget/${budgetId}`
  );
  return response.data;
};
