import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
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

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp, "gs://my-timer-12943.appspot.com");

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

export async function addFolder(path: string, image: File) {
  const folderRef = storageRef(storage, path);

  try {
    // 특정 폴더에 이미지 파일 업로드
    await uploadBytes(folderRef, image);
  } catch (error) {
    console.error("Error adding folder:", error);
  }
}

export async function deleteFolder(path: string) {
  const folderRef = storageRef(storage, path);

  try {
    await deleteObject(folderRef);
  } catch (error) {
    console.error("Error deleting folder:", error);
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

export async function addImage(path: string, image: File) {
  const imageRef = storageRef(storage, path);

  try {
    await uploadBytes(imageRef, image);
  } catch (error) {
    console.error("Error adding image:", error);
  }
}

export async function deleteImage(path: string) {
  const imageRef = storageRef(storage, path);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

const database = getDatabase(firebaseApp);

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

export default firebaseApp;
