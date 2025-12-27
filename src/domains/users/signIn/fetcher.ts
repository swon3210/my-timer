import { signInByFirebase, signOutByFirebase } from "@/lib/firebase/auth";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await signInByFirebase({ email, password });
    return user;
  } catch (error) {
    signOutByFirebase();
    console.error("로그인 실패:", error);
    throw error;
  }
};
