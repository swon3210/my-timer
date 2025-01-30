import { NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get, set, push } from "firebase/database";
import { database } from "@/app/api/firebase";
import { Category } from "@/domains/account-book/types";
import dayjs from "dayjs";
import { z } from "zod";

const getCategoriesResponseSchema = z.record(
  z.string(),
  z.object({
    displayedName: z.string(),
    type: z.enum(["INCOME", "EXPENSE"]),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
);

// GET: 카테고리 목록 조회
export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const categoriesRef = ref(
      database,
      `account-book-categories/${req.user.uid}`
    );
    const snapshot = await get(categoriesRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const categoriesResponse = getCategoriesResponseSchema.parse(
      snapshot.val()
    );

    return NextResponse.json(
      Object.entries(categoriesResponse).map(([id, category]) => ({
        id,
        ...category,
      }))
    );
  } catch (error) {
    console.error("카테고리 조회 실패:", error);
    return NextResponse.json(
      { error: "카테고리 조회에 실패했습니다." },
      { status: 500 }
    );
  }
});

// POST: 새 카테고리 추가
export const POST = withAuth(async (req: AuthRequest) => {
  try {
    const { displayedName, type } = await req.json();

    const newCategory: Omit<Category, "id"> = {
      displayedName,
      type,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    };

    const categoryRef = ref(
      database,
      `account-book-categories/${req.user.uid}`
    );

    const newCategoryRef = push(categoryRef);
    await set(newCategoryRef, newCategory);

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error("카테고리 생성 실패:", error);
    return NextResponse.json(
      { error: "카테고리 생성에 실패했습니다." },
      { status: 500 }
    );
  }
});
