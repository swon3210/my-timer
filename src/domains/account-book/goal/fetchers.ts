import { axiosInstance } from "@/lib/api";
import { Goal } from "@/app/api/account-books/goals/types";

export const getGoals = async () => {
  const response = await axiosInstance.get<Goal[]>("/api/account-books/goals");

  return response.data;
};

export const postGoals = async (goal: Omit<Goal, "id">) => {
  const response = await axiosInstance.post("/api/account-books/goals", goal);
  return response.data;
};

export const patchGoals = async (goal: Goal) => {
  const response = await axiosInstance.patch(
    `/api/account-books/goals/${goal.id}`,
    goal
  );
  return response.data;
};

export const deleteGoals = async (goalId: string) => {
  const response = await axiosInstance.delete(
    `/api/account-books/goals/${goalId}`
  );
  return response.data;
};
