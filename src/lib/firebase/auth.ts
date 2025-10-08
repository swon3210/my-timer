import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from ".";

const auth = getAuth(firebaseApp);

export const signUpByFirebase = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
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
export const signInByFirebase = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

export const signOutByFirebase = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
