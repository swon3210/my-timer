import { NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get, set, push } from "firebase/database";
import { database } from "@/lib/firebase";
import {
  createBudgetRequestParamsSchema,
  getBudgetsResponseSchema,
} from "./type";

const API_PATH = "account-book-budgets";

// GET: 예산 조회
export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const budgetsRef = ref(database, `${API_PATH}/${req.user.uid}`);
    const snapshot = await get(budgetsRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const budgetsData = snapshot.val();

    const budgetsResponse = getBudgetsResponseSchema.parse(budgetsData);

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

// POST: 예산 생성
export const POST = withAuth(async (req: AuthRequest) => {
  try {
    const body = await req.json();

    const { budget } = createBudgetRequestParamsSchema.parse(body);

    const now = new Date();

    const newBudget = {
      ...budget,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const budgetsRef = ref(database, `${API_PATH}/${req.user.uid}`);
    const newBudgetRef = push(budgetsRef);
    await set(newBudgetRef, newBudget);

    const response = {
      id: newBudgetRef.key,
      ...newBudget,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("예산 생성 실패:", error);
    return NextResponse.json(
      { error: "예산 생성에 실패했습니다." },
      { status: 500 }
    );
  }
});
