import { database } from "@/app/api/firebase";
import { withAuth } from "@/app/api/firebase-admin";
import { ref, remove, update } from "firebase/database";
import { NextResponse } from "next/server";

export const PATCH = withAuth(async (req, routeInfo) => {
  try {
    const id = routeInfo?.params.goalId;
    const {
      priority,
      displayName,
      description,
      imageUrl,
      targetAmount,
      startAt,
      endAt,
    } = await req.json();

    if (
      !id ||
      !priority ||
      !displayName ||
      !description ||
      !imageUrl ||
      !targetAmount ||
      !startAt ||
      !endAt
    ) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const goalRef = ref(database, `account-book-goals/${req.user.uid}/${id}`);

    const updates = {
      priority,
      displayName,
      description,
      imageUrl,
      targetAmount,
      startAt,
      endAt,
    };
    await update(goalRef, updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("목표 수정 실패:", error);
    return NextResponse.json(
      { error: "목표 수정에 실패했습니다." },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req, routeInfo) => {
  try {
    const id = routeInfo?.params.goalId;

    if (!id) {
      return NextResponse.json(
        { error: "목표 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const goalRef = ref(database, `account-book-goals/${req.user.uid}/${id}`);
    await remove(goalRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("목표 삭제 실패:", error);
    return NextResponse.json(
      { error: "목표 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
});
