import dayjs from "dayjs";
import {
  CreateTransactionRequestParams,
  UpdateTransactionRequestParams,
} from "./types";
import { get, push, ref, set, remove, update } from "firebase/database";
import { database } from "@/lib/firebase";
import { getCurrentUser } from "@/lib/firebase/auth";
import { z } from "zod";

const API_PATH = "account-books";

// route.ts에서 사용하던 스키마를 가져와서 사용하거나, 단순히 any로 처리 후 타입 단언할 수도 있지만, 안전하게 스키마를 정의하는 게 좋음.
// 하지만 types.ts에 response schema가 없다면 여기서 정의해야 함.
// route.ts에 있던 getTransactionsResponseSchema는 export되지 않았었음.
// 따라서 여기서 다시 정의하거나, 유연하게 처리.
const transactionSchema = z.object({
  amount: z.number(),
  content: z.string(),
  date: z.string(), // or date schema
  type: z.enum(["INCOME", "EXPENSE"]), // 예시
  // 필요한 필드들 추가
}).passthrough(); // passthrough로 유연하게

export const postTransaction = async (item: CreateTransactionRequestParams) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const accountBookRef = ref(database, `${API_PATH}/${user.uid}`);
  const newAccountBookRef = push(accountBookRef);
  await set(newAccountBookRef, item.transaction);

  return { message: "성공적으로 저장되었습니다." };
};

export const getTransactions = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const accountBookRef = ref(database, `${API_PATH}/${user.uid}`);
  const snapshot = await get(accountBookRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  // Object to Array conversion
  const transactions = Object.entries(data).map(([id, transaction]) => ({
    ...(transaction as any),
    id,
  }));

  return transactions.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
};

export const updateTransaction = async ({
  id,
  transaction,
}: UpdateTransactionRequestParams & { id: string }) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const transactionRef = ref(database, `${API_PATH}/${user.uid}/${id}`);
  await update(transactionRef, transaction);

  return { ...transaction, id };
};

export const deleteTransaction = async (itemId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const transactionRef = ref(database, `${API_PATH}/${user.uid}/${itemId}`);
  await remove(transactionRef);
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
