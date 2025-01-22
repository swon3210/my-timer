import { database } from "@/app/api/firebase";
import { withAuth } from "@/app/api/firebase-admin";
import { ref, remove, update } from "firebase/database";
import { NextResponse } from "next/server";

// PUT: 카테고리 수정
export const PUT = withAuth(async (req, routeInfo) => {
  try {
    const id = routeInfo?.params.categoryId;
    const { name } = await req.json();

    if (!id || !name) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const categoryRef = ref(
      database,
      `account-book-categories/${req.user.uid}/${id}`
    );

    const updates = { displayedName: name };
    await update(categoryRef, updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("카테고리 수정 실패:", error);
    return NextResponse.json(
      { error: "카테고리 수정에 실패했습니다." },
      { status: 500 }
    );
  }
});

// DELETE: 카테고리 삭제
export const DELETE = withAuth(async (req, routeInfo) => {
  try {
    const id = routeInfo?.params.categoryId;

    if (!id) {
      return NextResponse.json(
        { error: "카테고리 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const categoryRef = ref(
      database,
      `account-book-categories/${req.user.uid}/${id}`
    );
    await remove(categoryRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("카테고리 삭제 실패:", error);
    return NextResponse.json(
      { error: "카테고리 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
});
