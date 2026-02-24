import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp, { firestoreApp } from ".";

export const auth = getAuth(firebaseApp);

/** Firestore 전용 프로젝트의 Auth (dual sign-in용) */
export const firestoreAuth = getAuth(firestoreApp);

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

/** Firestore 프로젝트에 사용자 생성 또는 로그인 */
async function ensureFirestoreUser(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(
      firestoreAuth,
      email,
      password
    );
    return user;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err?.code === "auth/user-not-found") {
      const { user } = await createUserWithEmailAndPassword(
        firestoreAuth,
        email,
        password
      );
      return user;
    }
    throw error;
  }
}

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
    await createUserWithEmailAndPassword(firestoreAuth, email, password);
    return user;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

// 로그인 함수 (메인 앱 + Firestore 앱 dual sign-in)
export const signInByFirebase = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await ensureFirestoreUser(email, password);
    return user;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

let userPromiseCache: Promise<typeof auth.currentUser> | null = null;

export const getCurrentUser = (): Promise<typeof auth.currentUser> => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser);
  }
  if (userPromiseCache) {
    return userPromiseCache;
  }
  userPromiseCache = new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      userPromiseCache = null;
      resolve(user);
    }, reject);
  });
  return userPromiseCache;
};

let firestoreUserPromiseCache: Promise<
  (typeof firestoreAuth)["currentUser"]
> | null = null;

/** Firestore 전용 프로젝트의 현재 사용자 (갤러리 등 Firestore 작업용) */
export const getCurrentFirestoreUser = (): Promise<
  (typeof firestoreAuth)["currentUser"]
> => {
  if (firestoreAuth.currentUser) {
    return Promise.resolve(firestoreAuth.currentUser);
  }
  if (firestoreUserPromiseCache) {
    return firestoreUserPromiseCache;
  }
  firestoreUserPromiseCache = new Promise((resolve, reject) => {
    const unsubscribe = firestoreAuth.onAuthStateChanged((user) => {
      unsubscribe();
      firestoreUserPromiseCache = null;
      resolve(user);
    }, reject);
  });
  return firestoreUserPromiseCache;
};

export const signOutByFirebase = async () => {
  try {
    await auth.signOut();
    await firestoreAuth.signOut();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
