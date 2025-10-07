import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from ".";

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth(firebaseApp);

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

// 로그인 함수
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth(firebaseApp);

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};
