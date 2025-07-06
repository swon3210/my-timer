import { NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get, set, remove } from "firebase/database";
import { database } from "@/app/api/firebase";
import { getBudgetResponseSchema } from "../type";
import dayjs from "dayjs";

const API_PATH = "account-book-budgets";

// GET: 특정 예산 조회
export const GET = withAuth(async (req: AuthRequest, routeInfo) => {
  try {
    const id = routeInfo?.params.id;

    if (!id) {
      return NextResponse.json(
        { error: "예산 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const budgetRef = ref(database, `${API_PATH}/${req.user.uid}/${id}`);
    const snapshot = await get(budgetRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "예산을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const budgetData = snapshot.val();

    const budget = {
      id,
      ...budgetData,
    };

    return NextResponse.json(budget);
  } catch (error) {
    console.error("예산 조회 실패:", error);
    return NextResponse.json(
      { error: "예산 조회에 실패했습니다." },
      { status: 500 }
    );
  }
});

// PUT: 예산 수정
export const PUT = withAuth(async (req: AuthRequest, routeInfo) => {
  try {
    const id = routeInfo?.params.id;

    if (!id) {
      return NextResponse.json(
        { error: "예산 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 기존 예산 확인
    const budgetRef = ref(database, `${API_PATH}/${req.user.uid}/${id}`);
    const snapshot = await get(budgetRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "예산을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const body = await req.json();

    console.log({ body });

    const budgetData = getBudgetResponseSchema.parse(body);
    const now = dayjs().toISOString();

    const updatedBudget = {
      ...budgetData,
      updatedAt: now,
    };

    await set(budgetRef, updatedBudget);

    const response = {
      id,
      ...updatedBudget,
      updatedAt: now,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("예산 수정 실패:", error);
    return NextResponse.json(
      { error: "예산 수정에 실패했습니다." },
      { status: 500 }
    );
  }
});

// DELETE: 예산 삭제
export const DELETE = withAuth(async (req: AuthRequest, routeInfo) => {
  try {
    const id = routeInfo?.params.id;

    if (!id) {
      return NextResponse.json(
        { error: "예산 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 기존 예산 확인
    const budgetRef = ref(database, `${API_PATH}/${req.user.uid}/${id}`);
    const snapshot = await get(budgetRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "예산을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    await remove(budgetRef);

    return NextResponse.json({
      success: true,
      message: "예산이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("예산 삭제 실패:", error);
    return NextResponse.json(
      { error: "예산 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
});
