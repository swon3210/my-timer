"use client";

import { firebaseConfig } from "@/lib/firebase";
import { optimizeImage } from "@/lib/image";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { createContext, useContext, useMemo } from "react";

const FirebaseContext = createContext<{
  addImages: (
    folderPath: string,
    imageFiles: File[]
  ) => Promise<
    {
      fileName: string;
      downloadURL: string;
    }[]
  >;
}>({
  addImages: () => Promise.resolve([]),
});

export const useFirebase = () => {
  const firebaseConfig = useContext(FirebaseContext);
  if (!firebaseConfig) {
    throw new Error(
      "useFirebaseConfig must be used within a FirebaseConfigProvider"
    );
  }
  return firebaseConfig;
};

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const firebaseApp = useMemo(() => {
    if (!firebaseConfig) {
      return undefined;
    }

    return initializeApp(firebaseConfig);
  }, []);

  const storage = useMemo(() => {
    if (!firebaseApp) {
      return undefined;
    }

    return getStorage(firebaseApp);
  }, [firebaseApp]);

  const addImages = async (folderPath: string, imageFiles: File[]) => {
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

  return (
    <FirebaseContext.Provider
      value={{
        addImages,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
