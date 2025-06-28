import { NextResponse } from "next/server";
import { ref, get, set, push } from "firebase/database";
import { AuthRequest, withAuth } from "../../firebase-admin";
import { database } from "../../firebase";
import {
  createTransactionRequestParamsSchema,
  getTransactionsResponseSchema,
} from "./types";

const API_PATH = "account-books";

export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const accountBookRef = ref(database, `${API_PATH}/${req.user.uid}`);
    const snapshot = await get(accountBookRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const transactionsResponse = getTransactionsResponseSchema.parse(
      snapshot.val()
    );

    return NextResponse.json(
      Object.entries(transactionsResponse).map(([id, transaction]) => ({
        ...transaction,
        id,
      }))
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "데이터를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req: AuthRequest) => {
  try {
    const body = createTransactionRequestParamsSchema.parse(await req.json());

    const accountBookRef = ref(database, `${API_PATH}/${req.user.uid}`);
    const newAccountBookRef = push(accountBookRef);
    await set(newAccountBookRef, body.transaction);

    return NextResponse.json({ message: "성공적으로 저장되었습니다." });
  } catch {
    return NextResponse.json(
      { error: "데이터 저장에 실패했습니다." },
      { status: 500 }
    );
  }
});
