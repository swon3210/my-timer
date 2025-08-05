import { NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get } from "firebase/database";
import { database } from "@/app/api/firebase";
import { z } from "zod";

const querySchema = z.object({
  categoryId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

// GET: 카테고리별 지출 계산
export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const { categoryId, startDate, endDate } = querySchema.parse({
      categoryId: searchParams.get("categoryId"),
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
    });

    // 계정 항목에서 해당 카테고리와 기간에 해당하는 지출만 조회
    const accountItemsRef = ref(database, `account-book/${req.user.uid}`);
    const snapshot = await get(accountItemsRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ totalSpent: 0 });
    }

    const accountItems = snapshot.val();
    let totalSpent = 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // 모든 계정 항목을 순회하면서 조건에 맞는 것들의 금액을 합산
    Object.values(accountItems).forEach((item: unknown) => {
      const itemDate = new Date(item.date);
      const isExpense = item.type === "EXPENSE";
      const matchesCategory = item.categoryId === categoryId;
      const isInDateRange = itemDate >= start && itemDate <= end;

      if (isExpense && matchesCategory && isInDateRange) {
        totalSpent += item.amount || 0;
      }
    });

    return NextResponse.json({ totalSpent });
  } catch (error) {
    console.error("카테고리별 지출 계산 실패:", error);
    return NextResponse.json(
      { error: "카테고리별 지출 계산에 실패했습니다." },
      { status: 500 }
    );
  }
});
