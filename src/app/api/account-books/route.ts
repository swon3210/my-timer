import { NextResponse } from "next/server";
import { ref, get, set } from "firebase/database";
import { AuthRequest, withAuth } from "../firebase-admin";
import { database } from "../firebase";

export const GET = withAuth(async (req: AuthRequest) => {
  try {
    const accountBookRef = ref(database, `account-books/${req.user.uid}`);
    const snapshot = await get(accountBookRef);

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    return NextResponse.json(snapshot.val());
  } catch {
    return NextResponse.json(
      { error: "데이터를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req: AuthRequest) => {
  try {
    const body = await req.json();
    const accountBookRef = ref(database, `account-books/${req.user.uid}`);
    const snapshot = await get(accountBookRef);

    const existingData = snapshot.exists() ? snapshot.val() : [];
    const newData = [...existingData, body];

    await set(accountBookRef, newData);

    return NextResponse.json({ message: "성공적으로 저장되었습니다." });
  } catch {
    return NextResponse.json(
      { error: "데이터 저장에 실패했습니다." },
      { status: 500 }
    );
  }
});
