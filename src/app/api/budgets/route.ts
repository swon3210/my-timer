import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get, set, push } from "firebase/database";
import { database } from "@/app/api/firebase";
import { z } from "zod";

const budgetSchema = z.object({
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

const querySchema = z.object({
  period: z.enum(["weekly", "monthly", "yearly"]),
  year: z.coerce.number(),
  month: z.coerce.number().optional(),
});

// GET: 예산 조회
export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = querySchema.parse({
      period: searchParams.get("period"),
      year: searchParams.get("year"),
      month: searchParams.get("month"),
    });

    const budgetsRef = ref(database, `budgets/${req.user.uid}`);
    const snapshot = await get(budgetsRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const budgetsData = snapshot.val();
    const budgets = Object.entries(budgetsData).map(
      ([id, data]: [string, any]) => ({
        id,
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      })
    );

    // 기간과 년도/월로 필터링
    const filteredBudgets = budgets.filter((budget) => {
      if (budget.period !== query.period) return false;

      const budgetYear = budget.startDate.getFullYear();
      if (budgetYear !== query.year) return false;

      if (query.period === "monthly" && query.month !== undefined) {
        const budgetMonth = budget.startDate.getMonth();
        if (budgetMonth !== query.month) return false;
      }

      return true;
    });

    return NextResponse.json(filteredBudgets);
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
    const budgetData = budgetSchema.parse(body);

    const now = new Date();
    const newBudget = {
      userId: req.user.uid,
      title: budgetData.title,
      amount: budgetData.amount,
      period: budgetData.period,
      startDate: budgetData.startDate.toISOString(),
      endDate: budgetData.endDate.toISOString(),
      categories: budgetData.categories,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const budgetsRef = ref(database, `budgets/${req.user.uid}`);
    const newBudgetRef = push(budgetsRef);
    await set(newBudgetRef, newBudget);

    const response = {
      id: newBudgetRef.key,
      ...newBudget,
      startDate: budgetData.startDate,
      endDate: budgetData.endDate,
      createdAt: now,
      updatedAt: now,
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
