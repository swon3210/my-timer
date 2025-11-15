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
import { AppSettings, User } from "@/lib/types";
import { optimizeImage } from "../image";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export type FirebaseConfig = typeof firebaseConfig;

export const firebaseApp = initializeApp(firebaseConfig);

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

export async function addFolder(path: string) {
  const folderRef = storageRef(storage, path.concat("/.empty"));

  try {
    // 빈 폴더 업로드
    await uploadBytes(folderRef, new Blob());
  } catch (error) {
    console.error("Error adding folder:", error);
  }
}

export async function deleteFolders(paths: string[]) {
  try {
    for (const path of paths) {
      const folderRef = storageRef(storage, path);
      const res = await listAll(folderRef);

      // 모든 파일 삭제
      await Promise.all(res.items.map((itemRef) => deleteObject(itemRef)));

      // 재귀적으로 하위 폴더 삭제
      for (const prefix of res.prefixes) {
        await deleteFolders([prefix.fullPath]);
      }
    }
  } catch (error) {
    console.error("폴더 삭제 중 오류 발생:", error);
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

// TODO : 클라이언트에서 사용되고 있는 메서드와 통합
export const addImages = async (folderPath: string, imageFiles: File[]) => {
  try {
    const uploadPromises = imageFiles.map(async (file) => {
      // 파일명 생성 (현재 시간 + 원본 파일명)
      const fileName = file.name;

      // storage 참조 생성
      const imageStorageRef = storageRef(storage, `${folderPath}/${fileName}`);

      // 파일 업로드
      await uploadBytes(imageStorageRef, file);

      return {
        fileName,
      };
    });

    // 모든 이미지 업로드 완료 대기
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  }
};

export async function deleteImage(path: string) {
  const imageRef = storageRef(storage, path);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

export const database = getDatabase(firebaseApp);

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

export const getUserStoragePath = (user: User, path: string) => {
  if (user.email === "swon3210@gmail.com") {
    return path;
  }

  return `users/${user.email}/${path}`;
};

export const uploadImages = async (folderPath: string, imageFiles: File[]) => {
  if (!storage) {
    return [];
  }

  try {
    const uploadPromises = imageFiles.map(async (imageFile) => {
      // 파일명 생성 (현재 시간 + 원본 파일명)
      const fileName = imageFile.name;

      // storage 참조 생성
      const imageStorageRef = storageRef(
        storage,
        decodeURIComponent(`${folderPath}/${fileName}`)
      );

      let optimizedImage = await optimizeImage(imageFile);

      // 파일 업로드
      const snapshot = await uploadBytes(imageStorageRef, optimizedImage);

      // 업로드된 파일의 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 메모리 해제를 위해 참조 제거
      imageFile = null as unknown as File;
      optimizedImage = null as unknown as Blob;

      return {
        fileName,
        downloadURL,
      };
    });

    // 모든 이미지 업로드 완료 대기
    const results = await Promise.all(uploadPromises);

    // 전체 이미지 파일 배열 참조 제거
    imageFiles = null as unknown as File[];

    return results;
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  }
};

export default firebaseApp;
