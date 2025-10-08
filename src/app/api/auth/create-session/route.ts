import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../firebase-admin";
import { cookies } from "next/headers";

const requestParams = z.object({
  idToken: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { idToken } = requestParams.parse(await request.json());

    await adminAuth.verifyIdToken(idToken);

    // 1일 유효 기간 설정
    const expiresIn = 60 * 60 * 24 * 1000;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set("session", sessionCookie, {
      maxAge: Math.floor(expiresIn / 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "잘못된 요청입니다.", error: error.message },
        { status: 400 }
      );
    }

    console.error("로그인 실패 : ", error);
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
