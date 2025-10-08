import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../firebase-admin";
import { z } from "zod";

const requestParams = z.object({
  shouldRevokeAllSessions: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ message: "세션이 없습니다." }, { status: 401 });
  }

  try {
    await adminAuth.verifySessionCookie(session);
  } catch (error) {
    console.error("세션 검증 실패.", error);
    return NextResponse.json(
      { message: "세션 검증 실패.", error },
      { status: 401 }
    );
  }

  try {
    const { shouldRevokeAllSessions } = requestParams.parse(
      await request.json()
    );
    if (shouldRevokeAllSessions) {
      await adminAuth.revokeRefreshTokens(session);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "잘못된 요청입니다.", error: error.message },
        { status: 400 }
      );
    }

    console.error("세션 취소 실패.", error);
  }

  cookieStore.delete("session");

  return NextResponse.json(
    { message: "로그아웃 되었습니다." },
    { status: 200 }
  );
}
