import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/lib/types";

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

export type AuthRequest = NextRequest & { user: User };

const hasAuth = async (req: NextRequest) => {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    return {
      error: "인증되지 않았습니다.",
      success: false,
    };
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );

    (req as AuthRequest).user = {
      uid: decodedClaims.uid,
      email: decodedClaims.email ?? "",
      displayName: decodedClaims.name,
      imageUrl: decodedClaims.picture,
    };

    return {
      success: true,
    };
  } catch (error) {
    console.error("인증 오류:", error);
    return {
      error: "유효하지 않은 세션입니다.",
      success: false,
    };
  }
};

export function withAuth(
  handler: (
    req: AuthRequest,
    routeInfo?: { params: Record<string, string> }
  ) => Promise<NextResponse>
) {
  return async (
    req: AuthRequest,
    routeInfo?: { params: Record<string, string> }
  ) => {
    const { success, error } = await hasAuth(req);

    if (!success) {
      return NextResponse.json({ error }, { status: 401 });
    }

    return handler(req, routeInfo);
  };
}

export const adminAuth = admin.auth();
