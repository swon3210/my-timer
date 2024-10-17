import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref as dbRef, set, get } from "firebase/database";
import { AppSettings } from "@/lib/types";

const firebaseConfig = {
  apiKey: "AIzaSyDeylqDbJ872XSsURgrRKbCcExj_sVlkqY",
  authDomain: "my-timer-12943.firebaseapp.com",
  databaseURL:
    "https://my-timer-12943-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-timer-12943",
  storageBucket: "my-timer-12943.appspot.com",
  messagingSenderId: "517814501841",
  appId: "1:517814501841:web:2082fb3ef4954b36b7a0f0",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, "gs://my-timer-12943.appspot.com24");

export async function getFolderList(path: string) {
  const folderRef = storageRef(storage, path);

  try {
    // 'storagePath' 내 모든 파일 및 하위 폴더 목록 가져오기
    const res = await listAll(folderRef);

    // 폴더에 해당하는 prefix 목록을 가져옴 (폴더는 prefix로 구분)
    const folders = res.prefixes.map((folderRef) => folderRef.fullPath);

    return folders;
  } catch (error) {
    console.error("Error fetching folder list:", error);
  }
}

export async function getImageListFromFolder(path: string) {
  const folderRef = storageRef(storage, path);

  try {
    // 폴더 내 모든 파일 목록 가져오기
    const res = await listAll(folderRef);

    // 이미지 파일들의 다운로드 URL 가져오기
    const imageUrls = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    );
    return imageUrls;
  } catch (error) {
    console.error("Error fetching image list:", error);
  }
}

const auth = getAuth(app);

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

const database = getDatabase(app);

export const saveAppSettings = async (
  userId: string,
  settings: AppSettings
): Promise<void> => {
  try {
    const settingsRef = dbRef(database, `users/${userId}/settings`);
    await set(settingsRef, settings);
  } catch (error) {
    console.error("Settings 정보를 저장하는데 실패하였습니다 : ", error);
  }
};

export const getAppSettings = async (userId: string) => {
  try {
    const settingsRef = dbRef(database, `users/${userId}/settings`);
    const snapshot = await get(settingsRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Settings 정보를 불러오는데 실패하였습니다 : ", error);
    return null;
  }
};

export default app;
