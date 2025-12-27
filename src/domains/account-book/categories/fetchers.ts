import { Category } from "./types";
import { get, push, ref, set, remove, update } from "firebase/database";
import { database } from "@/lib/firebase";
import { getCurrentUser } from "@/lib/firebase/auth";
import dayjs from "dayjs";

const API_PATH = "account-book-categories";

export const getTransactionCategories = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const categoriesRef = ref(database, `${API_PATH}/${user.uid}`);
  const snapshot = await get(categoriesRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  return Object.entries(data).map(([id, category]) => ({
    id,
    ...(category as any),
  }));
};

export const postTransactionCategory = async (
  category: Omit<Category, "id" | "createdAt" | "updatedAt">
) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const newCategory: Omit<Category, "id"> = {
    ...category,
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  };

  const categoryRef = ref(database, `${API_PATH}/${user.uid}`);
  const newCategoryRef = push(categoryRef);
  await set(newCategoryRef, newCategory);

  return { ...newCategory, id: newCategoryRef.key };
};

export const deleteTransactionCategory = async (categoryId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const categoryRef = ref(database, `${API_PATH}/${user.uid}/${categoryId}`);
  await remove(categoryRef);
};

export const updateTransactionCategory = async ({
  categoryId,
  displayedName,
  icon,
}: {
  categoryId: string;
  displayedName: string;
  icon?: string;
}) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const updateData: { displayedName: string; icon?: string } = {
    displayedName,
  };

  if (icon !== undefined) {
    updateData.icon = icon;
  }

  const categoryRef = ref(database, `${API_PATH}/${user.uid}/${categoryId}`);
  await update(categoryRef, updateData);

  return updateData;
};
