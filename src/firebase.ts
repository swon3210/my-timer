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
const storageRef = ref(storage, "images/raiden"); // 'images/' 디렉토리 참조

// Firebase Storage에서 이미지 목록을 불러오는 함수
async function loadImages() {
  try {
    // 'images/' 폴더 내 파일 목록 가져오기
    const res = await listAll(storageRef);
    const imageUrls = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    );

    return imageUrls;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

export { loadImages };

export default app;
