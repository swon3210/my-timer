import { NextResponse } from "next/server";
import { ref, get, set, push } from "firebase/database";
import { AuthRequest, withAuth } from "../firebase-admin";
import { database } from "../firebase";
import { z } from "zod";

const getAccountBookItemsResponseSchema = z.record(
  z.string(),
  z.object({
    amount: z.number(),
    categoryId: z.string(),
    type: z.enum(["INCOME", "EXPENSE", "INVESTMENT", "FLEX"]),
    description: z.string().optional(),
    date: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    categoryDisplayedName: z.string(),
  })
);

export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const accountBookRef = ref(database, `account-books/${req.user.uid}`);
    const snapshot = await get(accountBookRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const accountBooksResponse = getAccountBookItemsResponseSchema.parse(
      snapshot.val()
    );

    return NextResponse.json(
      Object.entries(accountBooksResponse).map(([id, accountBookItem]) => ({
        id,
        ...accountBookItem,
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
    const body = await req.json();

    const accountBookRef = ref(database, `account-books/${req.user.uid}`);
    const newAccountBookRef = push(accountBookRef);
    await set(newAccountBookRef, body);

    return NextResponse.json({ message: "성공적으로 저장되었습니다." });
  } catch {
    return NextResponse.json(
      { error: "데이터 저장에 실패했습니다." },
      { status: 500 }
    );
  }
});
