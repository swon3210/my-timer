import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from ".";

export const auth = getAuth(firebaseApp);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRefreshToken = async () => {
  // TODO : 토큰 리프레시가 auth 초기화 이후 수행되는 로직 고도화
  await wait(1000);

  const user = auth.currentUser;

  if (user) {
    const idToken = await user.getIdToken(true);
    return idToken;
  }
};

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

export const getCurrentUser = (): Promise<typeof auth.currentUser> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const signOutByFirebase = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
