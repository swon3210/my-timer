import { ref, remove, update } from "firebase/database";
import { database } from "../../../firebase";
import { withAuth } from "../../../firebase-admin";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { updateTransactionRequestParamsSchema } from "../types";

export const PATCH = withAuth(async (req, routeInfo) => {
  const id = routeInfo?.params.id;
  const body = updateTransactionRequestParamsSchema.parse(await req.json());

  if (!id) {
    return NextResponse.json(
      { error: "내역 ID가 필요합니다." },
      { status: 400 }
    );
  }

  const accountBookRef = ref(database, `account-books/${req.user.uid}/${id}`);

  const updates = {
    ...body.transaction,
    updatedAt: dayjs().toISOString(),
  };

  await update(accountBookRef, updates);

  return NextResponse.json({ success: true });
});

export const DELETE = withAuth(async (req, routeInfo) => {
  const id = routeInfo?.params.id;

  if (!id) {
    return NextResponse.json(
      { error: "내역 ID가 필요합니다." },
      { status: 400 }
    );
  }

  const accountBookRef = ref(database, `account-books/${req.user.uid}/${id}`);
  await remove(accountBookRef);

  return NextResponse.json({ success: true });
});
