import { NextResponse } from "next/server";
import { withAuth, AuthRequest } from "@/app/api/firebase-admin";
import { ref, get, set, push } from "firebase/database";
import { database } from "@/app/api/firebase";
import { z } from "zod";
import { Goal, goalSchema } from "./types";

const getGoalsResponseSchema = z.record(z.string(), goalSchema);

export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const goalsRef = ref(database, `account-book-goals/${req.user.uid}`);
    const snapshot = await get(goalsRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const goalsResponse = getGoalsResponseSchema.parse(snapshot.val());

    return NextResponse.json(
      Object.entries(goalsResponse).map(([id, goal]) => ({
        id,
        ...goal,
      }))
    );
  } catch (error) {
    console.error("목표 조회 실패:", error);
    return NextResponse.json(
      { error: "목표 조회에 실패했습니다." },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req: AuthRequest) => {
  try {
    const body = await req.json();

    const newGoal: Omit<Goal, "id"> = {
      ...body,
      status: "ON-GOING",
    };

    const goalRef = ref(database, `account-book-goals/${req.user.uid}`);

    const newGoalRef = push(goalRef);
    await set(newGoalRef, newGoal);

    return NextResponse.json(newGoal);
  } catch (error) {
    console.error("목표 생성 실패:", error);
    return NextResponse.json(
      { error: "목표 생성에 실패했습니다." },
      { status: 500 }
    );
  }
});
