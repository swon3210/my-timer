import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "./firebase";

const auth = getAuth(firebaseApp);

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("회원가입 성공:", user);
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
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("로그인 성공:", user);
    return user;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};
