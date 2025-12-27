import { Goal } from "./types";
import { get, push, ref, set, remove, update } from "firebase/database";
import { database } from "@/lib/firebase";
import { getCurrentUser } from "@/lib/firebase/auth";

const API_PATH = "account-book-goals";

export const getGoals = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const goalsRef = ref(database, `${API_PATH}/${user.uid}`);
  const snapshot = await get(goalsRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  return Object.entries(data).map(([id, goal]) => ({
    id,
    ...(goal as any),
  }));
};

export const postGoals = async (goal: Omit<Goal, "id">) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const newGoal = {
    ...goal,
    status: "ON-GOING",
  };

  const goalRef = ref(database, `${API_PATH}/${user.uid}`);
  const newGoalRef = push(goalRef);
  await set(newGoalRef, newGoal);

  return { ...newGoal, id: newGoalRef.key };
};

export const patchGoals = async (goal: Goal) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const goalRef = ref(database, `${API_PATH}/${user.uid}/${goal.id}`);
  await update(goalRef, goal);

  return goal;
};

export const deleteGoals = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const goalRef = ref(database, `${API_PATH}/${user.uid}/${id}`);
  await remove(goalRef);
};
