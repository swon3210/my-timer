import admin from "firebase-admin";
import serviceAccount from "./service-account.json";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export type AuthRequest = NextRequest & { user: DecodedIdToken };

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const sessionCookie = cookies().get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "인증되지 않았습니다." },
        { status: 401 }
      );
    }

    try {
      const decodedClaims = await adminAuth.verifySessionCookie(
        sessionCookie,
        true
      );
      (req as AuthRequest).user = decodedClaims;
      return handler(req);
    } catch (error) {
      console.error("인증 오류:", error);
      return NextResponse.json(
        { error: "유효하지 않은 세션입니다." },
        { status: 401 }
      );
    }
  };
}

export const adminAuth = admin.auth();
