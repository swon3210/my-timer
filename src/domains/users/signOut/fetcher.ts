import { signOutByFirebase } from "@/lib/firebase/auth";

export const signOut = async ({
  shouldRevokeAllSessions, // 유지하되 사용하지 않음 (API 호환성 위함)
}: {
  shouldRevokeAllSessions: boolean;
}) => {
  await signOutByFirebase();
};
