import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("session");

  return NextResponse.json(
    { message: "로그아웃 되었습니다." },
    { status: 200 }
  );
}
