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

// 동적 import를 사용하여 빌드 타임에 로드되지 않도록 함
let adminInstance: typeof import("firebase-admin") | null = null;
let adminAuthInstance: ReturnType<
  typeof import("firebase-admin")["auth"]
> | null = null;

async function getAdminAuth() {
  if (!adminInstance) {
    adminInstance = await import("firebase-admin");
    if (!adminInstance.apps.length) {
      adminInstance.initializeApp({
        credential: adminInstance.credential.cert(
          serviceAccount as Parameters<
            typeof adminInstance.credential.cert
          >[0]
        ),
      });
    }
    adminAuthInstance = adminInstance.auth();
  }
  return adminAuthInstance!;
}

export type AuthRequest = NextRequest & { user: User };

// TODO : hasAuth 가 user 정보도 같이 담는 사이드이펙트가 있음. 수정해야함.
const hasAuth = async (req: NextRequest) => {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    return {
      error: "인증되지 않았습니다.",
      success: false,
    };
  }

  try {
    const adminAuth = await getAdminAuth();
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

// 지연 초기화를 위해 함수로 export
export async function getAdminAuthInstance() {
  return await getAdminAuth();
}

// 하위 호환성을 위해 getter 함수로 export (지연 초기화)
export const adminAuth = {
  verifyIdToken: async (idToken: string) => {
    const auth = await getAdminAuth();
    return auth.verifyIdToken(idToken);
  },
  createSessionCookie: async (
    idToken: string,
    options: { expiresIn: number }
  ) => {
    const auth = await getAdminAuth();
    return auth.createSessionCookie(idToken, options);
  },
  verifySessionCookie: async (
    sessionCookie: string,
    checkRevoked?: boolean
  ) => {
    const auth = await getAdminAuth();
    return auth.verifySessionCookie(sessionCookie, checkRevoked);
  },
  revokeRefreshTokens: async (uid: string) => {
    const auth = await getAdminAuth();
    return auth.revokeRefreshTokens(uid);
  },
};
