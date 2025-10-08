import api from "@/domains/api";
import { signInByFirebase, signOutByFirebase } from "@/lib/firebase/auth";

export const createSession = async ({ idToken }: { idToken: string }) => {
  const response = await api.post("/api/auth/create-session", { idToken });

  return response.data;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await signInByFirebase({ email, password });

  const idToken = await user.getIdToken(true);

  try {
    const result = await createSession({
      idToken,
    });
    return result;
  } catch (error) {
    // 세션 생성 실패 시에도 파이어베이스에는 로그인 되지 않도록 fallback 처리
    signOutByFirebase();
    console.error("세션 생성 실패:", error);
    throw error;
  }
};
