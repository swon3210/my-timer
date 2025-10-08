import api from "@/domains/api";
import { signOutByFirebase } from "@/lib/firebase/auth";

export const clearSession = async ({
  shouldRevokeAllSessions,
}: {
  shouldRevokeAllSessions: boolean;
}) => {
  const response = await api.post("/api/auth/clear-session", {
    shouldRevokeAllSessions,
  });

  return response.data;
};

export const signOut = async ({
  shouldRevokeAllSessions,
}: {
  shouldRevokeAllSessions: boolean;
}) => {
  const result = await clearSession({
    shouldRevokeAllSessions,
  });

  // firebase auth 로그아웃을 수행하더라도 세션 쿠키가 무효화 되지 않기 때문에 세션 쿠키 무효화부터 수행함
  await signOutByFirebase();

  return result;
};
