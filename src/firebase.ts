import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

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

const storage = getStorage(app, "gs://my-timer-12943.appspot.com");

export async function getFolderList(path: string) {
  const folderRef = ref(storage, path);

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
  const folderRef = ref(storage, path);

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

export default app;
