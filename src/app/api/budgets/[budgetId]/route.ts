import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get, set, remove } from "firebase/database";
import { database } from "@/app/api/firebase";
import { z } from "zod";

const budgetUpdateSchema = z.object({
  title: z.string(),
  amount: z.number().positive(),
  period: z.enum(["weekly", "monthly", "yearly"]),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  categories: z.array(
    z.object({
      categoryId: z.string(),
      categoryName: z.string(),
      allocatedAmount: z.number().min(0),
      color: z.string(),
    })
  ),
});

// GET: 특정 예산 조회
export const GET = withAuth(async (req: AuthRequest, context: any) => {
  try {
    const budgetId = context.params.budgetId;

    if (!budgetId) {
      return NextResponse.json(
        { error: "예산 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const budgetRef = ref(database, `budgets/${req.user.uid}/${budgetId}`);
    const snapshot = await get(budgetRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "예산을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const budgetData = snapshot.val();
    const budget = {
      id: budgetId,
      ...budgetData,
      startDate: new Date(budgetData.startDate),
      endDate: new Date(budgetData.endDate),
      createdAt: new Date(budgetData.createdAt),
      updatedAt: new Date(budgetData.updatedAt),
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
export const PUT = withAuth(async (req: AuthRequest, context: any) => {
  try {
    const budgetId = context.params.budgetId;

    if (!budgetId) {
      return NextResponse.json(
        { error: "예산 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const budgetData = budgetUpdateSchema.parse(body);

    // 기존 예산 확인
    const budgetRef = ref(database, `budgets/${req.user.uid}/${budgetId}`);
    const snapshot = await get(budgetRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "예산을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const existingBudget = snapshot.val();
    const now = new Date();

    const updatedBudget = {
      ...existingBudget,
      title: budgetData.title,
      amount: budgetData.amount,
      period: budgetData.period,
      startDate: budgetData.startDate.toISOString(),
      endDate: budgetData.endDate.toISOString(),
      categories: budgetData.categories,
      updatedAt: now.toISOString(),
    };

    await set(budgetRef, updatedBudget);

    const response = {
      id: budgetId,
      ...updatedBudget,
      startDate: budgetData.startDate,
      endDate: budgetData.endDate,
      createdAt: new Date(existingBudget.createdAt),
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
export const DELETE = withAuth(async (req: AuthRequest, context: any) => {
  try {
    const budgetId = context.params.budgetId;

    if (!budgetId) {
      return NextResponse.json(
        { error: "예산 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 기존 예산 확인
    const budgetRef = ref(database, `budgets/${req.user.uid}/${budgetId}`);
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
