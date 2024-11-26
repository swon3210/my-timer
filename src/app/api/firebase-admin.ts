import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY,
  client_email: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url:
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
};

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
