import { Budget } from "./type";
import { get, push, ref, set, remove, update } from "firebase/database";
import { database } from "@/lib/firebase";
import { getCurrentUser } from "@/lib/firebase/auth";

const API_PATH = "account-book-budgets";

export const getBudgets = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const budgetsRef = ref(database, `${API_PATH}/${user.uid}`);
  const snapshot = await get(budgetsRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  return Object.entries(data).map(([id, budget]) => ({
    id,
    ...(budget as any),
  }));
};

export const postBudget = async (
  budget: Omit<Budget, "id" | "createdAt" | "updatedAt">
) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const now = new Date();
  const newBudget = {
    ...budget,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const budgetsRef = ref(database, `${API_PATH}/${user.uid}`);
  const newBudgetRef = push(budgetsRef);
  await set(newBudgetRef, newBudget);

  return { ...newBudget, id: newBudgetRef.key };
};

export const patchBudget = async (
  budget: Omit<Budget, "createdAt" | "updatedAt">
) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const budgetRef = ref(database, `${API_PATH}/${user.uid}/${budget.id}`);
  await update(budgetRef, budget);

  return budget;
};

export const deleteBudget = async (budgetId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const budgetRef = ref(database, `${API_PATH}/${user.uid}/${budgetId}`);
  await remove(budgetRef);
};
