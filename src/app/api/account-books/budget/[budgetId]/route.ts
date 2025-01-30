import { database } from "@/app/api/firebase";
import { withAuth } from "@/app/api/firebase-admin";
import { ref, remove, update } from "firebase/database";
import { NextResponse } from "next/server";

// PATCH: 예산 수정
export const PATCH = withAuth(async (req, routeInfo) => {
  try {
    const id = routeInfo?.params.budgetId;
    const { name, amount } = await req.json();

    if (!id || !name || !amount) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const budgetRef = ref(
      database,
      `account-book-budgets/${req.user.uid}/${id}`
    );

    const updates = { name, amount };
    await update(budgetRef, updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("예산 수정 실패:", error);
    return NextResponse.json(
      { error: "예산 수정에 실패했습니다." },
      { status: 500 }
    );
  }
});

// DELETE: 카테고리 삭제
export const DELETE = withAuth(async (req, routeInfo) => {
  try {
    const id = routeInfo?.params.budgetId;

    if (!id) {
      return NextResponse.json(
        { error: "예산 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const budgetRef = ref(
      database,
      `account-book-budgets/${req.user.uid}/${id}`
    );
    await remove(budgetRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("예산 삭제 실패:", error);
    return NextResponse.json(
      { error: "예산 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
});
