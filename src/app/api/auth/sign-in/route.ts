import { z } from "zod";
import { signIn } from "../../../../lib/firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../firebase-admin";
import { cookies } from "next/headers";

const SignInRequestParams = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  const { email, password } = SignInRequestParams.parse(await request.json());

  try {
    const user = await signIn({ email, password });

    const idToken = await user.getIdToken();

    await adminAuth.verifyIdToken(idToken);

    // 1일 유효
    const expiresIn = 60 * 60 * 24 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("로그인 실패 : ", error);
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
