import { signUpByFirebase } from "@/lib/firebase/auth";

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await signUpByFirebase({ email, password });

  return user;
};
