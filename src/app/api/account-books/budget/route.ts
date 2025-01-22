import { NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get, set, push } from "firebase/database";
import { database } from "@/app/api/firebase";
import { z } from "zod";
import { Budget } from "@/domains/account-book/budgets/types";

const getBudgetsResponseSchema = z.record(
  z.string(),
  z.object({
    amount: z.number(),
    categoryId: z.string(),
    type: z.enum(["INCOME", "EXPENSE", "INVESTMENT", "FLEX"]),
  })
);

// GET: 예산 목록 조회
export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const budgetsRef = ref(database, `account-book-budgets/${req.user.uid}`);
    const snapshot = await get(budgetsRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const budgetsResponse = getBudgetsResponseSchema.parse(snapshot.val());

    return NextResponse.json(
      Object.entries(budgetsResponse).map(([id, budget]) => ({
        id,
        ...budget,
      }))
    );
  } catch (error) {
    console.error("예산 조회 실패:", error);
    return NextResponse.json(
      { error: "예산 조회에 실패했습니다." },
      { status: 500 }
    );
  }
});

// POST: 새 예산 추가
export const POST = withAuth(async (req: AuthRequest) => {
  try {
    const { amount, categoryId, type, date } = await req.json();

    const newBudget: Omit<Budget, "id"> = {
      amount,
      categoryId,
      type,
      date,
    };

    const budgetRef = ref(database, `account-book-budgets/${req.user.uid}`);

    const newBudgetRef = push(budgetRef);
    await set(newBudgetRef, newBudget);

    return NextResponse.json(newBudget);
  } catch (error) {
    console.error("예산 생성 실패:", error);
    return NextResponse.json(
      { error: "예산 생성에 실패했습니다." },
      { status: 500 }
    );
  }
});
