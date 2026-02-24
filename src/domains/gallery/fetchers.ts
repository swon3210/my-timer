import {
  firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
} from "@/lib/firebase/firestore";
import { getCurrentFirestoreUser } from "@/lib/firebase/auth";
import {
  Gallery,
  ImageFolder,
  GalleryImage,
  CreateGalleryInput,
  CreateImageFolderInput,
  CreateGalleryImageInput,
  toGallery,
  toImageFolder,
  toGalleryImage,
} from "./types";

// ==================== 갤러리 (카테고리) ====================

/**
 * 모든 갤러리 목록 조회
 */
export const getGalleries = async (): Promise<Gallery[]> => {
  const user = await getCurrentFirestoreUser();

  if (!user) throw new Error("Unauthorized");

  const galleriesRef = collection(firestore, `users/${user.uid}/galleries`);
  const q = query(galleriesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) =>
    toGallery(doc.id, doc.data() as Omit<Gallery, "id">)
  );
};

/**
 * 갤러리 생성
 */
export const createGallery = async (
  input: CreateGalleryInput
): Promise<Gallery> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const galleriesRef = collection(firestore, `users/${user.uid}/galleries`);
  const now = Timestamp.now();

  const newGallery = {
    name: input.name,
    folderCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(galleriesRef, newGallery);
  return toGallery(docRef.id, newGallery);
};

/**
 * 갤러리 삭제 (하위 폴더/이미지도 함께 삭제)
 */
export const deleteGallery = async (galleryId: string): Promise<void> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const batch = writeBatch(firestore);

  // 1. 해당 갤러리의 모든 이미지 삭제
  const imagesRef = collection(firestore, `users/${user.uid}/images`);
  const imagesQuery = query(imagesRef, where("galleryId", "==", galleryId));
  const imagesSnapshot = await getDocs(imagesQuery);
  imagesSnapshot.docs.forEach((doc) => batch.delete(doc.ref));

  // 2. 해당 갤러리의 모든 폴더 삭제
  const foldersRef = collection(firestore, `users/${user.uid}/imageFolders`);
  const foldersQuery = query(foldersRef, where("galleryId", "==", galleryId));
  const foldersSnapshot = await getDocs(foldersQuery);
  foldersSnapshot.docs.forEach((doc) => batch.delete(doc.ref));

  // 3. 갤러리 삭제
  const galleryRef = doc(firestore, `users/${user.uid}/galleries/${galleryId}`);
  batch.delete(galleryRef);

  await batch.commit();
};

// ==================== 이미지 폴더 ====================

/**
 * 특정 갤러리의 이미지 폴더 목록 조회
 */
export const getImageFolders = async (
  galleryId: string
): Promise<ImageFolder[]> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const foldersRef = collection(firestore, `users/${user.uid}/imageFolders`);
  const q = query(
    foldersRef,
    where("galleryId", "==", galleryId)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) =>
    toImageFolder(doc.id, doc.data() as Omit<ImageFolder, "id">)
  );
};

/**
 * 갤러리 이름으로 이미지 폴더 목록 조회 (기존 호환)
 */
export const getImageFoldersByGalleryName = async (
  galleryName: string
): Promise<ImageFolder[]> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const foldersRef = collection(firestore, `users/${user.uid}/imageFolders`);
  const q = query(
    foldersRef,
    where("galleryName", "==", galleryName),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) =>
    toImageFolder(doc.id, doc.data() as Omit<ImageFolder, "id">)
  );
};

/**
 * 이미지 폴더 생성
 */
export const createImageFolder = async (
  input: CreateImageFolderInput
): Promise<ImageFolder> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const foldersRef = collection(firestore, `users/${user.uid}/imageFolders`);
  const now = Timestamp.now();

  const newFolder = {
    galleryId: input.galleryId,
    galleryName: input.galleryName,
    name: input.name,
    imageCount: 0,
    thumbnailUrl: null,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(foldersRef, newFolder);

  // 갤러리의 folderCount 업데이트
  const galleryRef = doc(
    firestore,
    `users/${user.uid}/galleries/${input.galleryId}`
  );
  const gallerySnapshot = await getDoc(galleryRef);
  if (gallerySnapshot.exists()) {
    const currentCount = gallerySnapshot.data().folderCount || 0;
    await updateDoc(galleryRef, {
      folderCount: currentCount + 1,
      updatedAt: now,
    });
  }

  return toImageFolder(docRef.id, newFolder);
};

/**
 * 이미지 폴더 삭제 (하위 이미지도 함께 삭제)
 */
export const deleteImageFolder = async (folderId: string): Promise<void> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  // 폴더 정보 조회 (갤러리 ID 확인용)
  const folderRef = doc(
    firestore,
    `users/${user.uid}/imageFolders/${folderId}`
  );
  const folderSnapshot = await getDoc(folderRef);

  if (!folderSnapshot.exists()) {
    throw new Error("Folder not found");
  }

  const folderData = folderSnapshot.data() as Omit<ImageFolder, "id">;
  const batch = writeBatch(firestore);

  // 1. 해당 폴더의 모든 이미지 삭제
  const imagesRef = collection(firestore, `users/${user.uid}/images`);
  const imagesQuery = query(imagesRef, where("folderId", "==", folderId));
  const imagesSnapshot = await getDocs(imagesQuery);
  imagesSnapshot.docs.forEach((doc) => batch.delete(doc.ref));

  // 2. 폴더 삭제
  batch.delete(folderRef);

  // 3. 갤러리의 folderCount 업데이트
  const galleryRef = doc(
    firestore,
    `users/${user.uid}/galleries/${folderData.galleryId}`
  );
  const gallerySnapshot = await getDoc(galleryRef);
  if (gallerySnapshot.exists()) {
    const currentCount = gallerySnapshot.data().folderCount || 0;
    batch.update(galleryRef, {
      folderCount: Math.max(0, currentCount - 1),
      updatedAt: Timestamp.now(),
    });
  }

  await batch.commit();
};

// ==================== 이미지 ====================

/**
 * 특정 폴더의 이미지 목록 조회
 */
export const getImages = async (folderId: string): Promise<GalleryImage[]> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const imagesRef = collection(firestore, `users/${user.uid}/images`);
  const q = query(
    imagesRef,
    where("folderId", "==", folderId),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) =>
    toGalleryImage(doc.id, doc.data() as Omit<GalleryImage, "id">)
  );
};

/**
 * 갤러리 ID와 폴더명으로 이미지 목록 조회
 */
export const getImagesByFolderName = async (
  galleryId: string,
  folderName: string
): Promise<GalleryImage[]> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  // 먼저 폴더 ID 조회
  const foldersRef = collection(firestore, `users/${user.uid}/imageFolders`);
  const folderQuery = query(
    foldersRef,
    where("galleryId", "==", galleryId),
    where("name", "==", folderName)
  );
  const folderSnapshot = await getDocs(folderQuery);

  if (folderSnapshot.empty) {
    return [];
  }

  const folderId = folderSnapshot.docs[0].id;

  // 이미지 조회
  const imagesRef = collection(firestore, `users/${user.uid}/images`);
  const imagesQuery = query(
    imagesRef,
    where("folderId", "==", folderId),
    orderBy("order", "asc")
  );
  const imagesSnapshot = await getDocs(imagesQuery);

  return imagesSnapshot.docs.map((doc) =>
    toGalleryImage(doc.id, doc.data() as Omit<GalleryImage, "id">)
  );
};


/**
 * 이미지 메타데이터 저장 (업로드 후 호출)
 */
export const createGalleryImage = async (
  input: CreateGalleryImageInput
): Promise<GalleryImage> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const imagesRef = collection(firestore, `users/${user.uid}/images`);
  const now = Timestamp.now();

  const newImage = {
    galleryId: input.galleryId,
    folderId: input.folderId,
    fileName: input.fileName,
    downloadUrl: input.downloadUrl,
    storagePath: input.storagePath,
    order: input.order,
    createdAt: now,
  };

  const docRef = await addDoc(imagesRef, newImage);

  // 폴더의 imageCount 및 thumbnailUrl 업데이트
  const folderRef = doc(
    firestore,
    `users/${user.uid}/imageFolders/${input.folderId}`
  );
  const folderSnapshot = await getDoc(folderRef);

  if (folderSnapshot.exists()) {
    const folderData = folderSnapshot.data();
    const currentCount = folderData.imageCount || 0;

    // 첫 번째 이미지면 썸네일로 설정
    if (!folderData.thumbnailUrl) {
      await updateDoc(folderRef, {
        imageCount: currentCount + 1,
        updatedAt: now,
        thumbnailUrl: input.downloadUrl,
      });
    } else {
      await updateDoc(folderRef, {
        imageCount: currentCount + 1,
        updatedAt: now,
      });
    }
  }

  return toGalleryImage(docRef.id, newImage);
};

/**
 * 여러 이미지 메타데이터 일괄 저장
 */
export const createGalleryImages = async (
  inputs: CreateGalleryImageInput[]
): Promise<GalleryImage[]> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  if (inputs.length === 0) return [];

  const batch = writeBatch(firestore);
  const imagesRef = collection(firestore, `users/${user.uid}/images`);
  const now = Timestamp.now();

  const results: { id: string; data: Omit<GalleryImage, "id"> }[] = [];

  // 이미지별로 배치 추가
  for (const input of inputs) {
    const docRef = doc(imagesRef);
    const newImage = {
      galleryId: input.galleryId,
      folderId: input.folderId,
      fileName: input.fileName,
      downloadUrl: input.downloadUrl,
      storagePath: input.storagePath,
      order: input.order,
      createdAt: now,
    };
    batch.set(docRef, newImage);
    results.push({ id: docRef.id, data: newImage });
  }

  // 폴더 imageCount 업데이트 (같은 폴더에 속한 이미지들)
  const folderIds = Array.from(new Set(inputs.map((i) => i.folderId)));
  for (const folderId of folderIds) {
    const folderRef = doc(
      firestore,
      `users/${user.uid}/imageFolders/${folderId}`
    );
    const folderSnapshot = await getDoc(folderRef);

    if (folderSnapshot.exists()) {
      const folderData = folderSnapshot.data();
      const currentCount = folderData.imageCount || 0;
      const addedCount = inputs.filter((i) => i.folderId === folderId).length;
      const firstImage = inputs.find((i) => i.folderId === folderId);

      // 썸네일이 없으면 첫 번째 이미지로 설정
      if (!folderData.thumbnailUrl && firstImage) {
        batch.update(folderRef, {
          imageCount: currentCount + addedCount,
          updatedAt: now,
          thumbnailUrl: firstImage.downloadUrl,
        });
      } else {
        batch.update(folderRef, {
          imageCount: currentCount + addedCount,
          updatedAt: now,
        });
      }
    }
  }

  await batch.commit();

  return results.map(({ id, data }) => toGalleryImage(id, data));
};

/**
 * 이미지 삭제
 */
export const deleteGalleryImage = async (imageId: string): Promise<void> => {
  const user = await getCurrentFirestoreUser();
  if (!user) throw new Error("Unauthorized");

  const imageRef = doc(firestore, `users/${user.uid}/images/${imageId}`);
  const imageSnapshot = await getDoc(imageRef);

  if (!imageSnapshot.exists()) {
    throw new Error("Image not found");
  }

  const imageData = imageSnapshot.data() as Omit<GalleryImage, "id">;

  // 이미지 삭제
  await deleteDoc(imageRef);

  // 폴더의 imageCount 업데이트
  const folderRef = doc(
    firestore,
    `users/${user.uid}/imageFolders/${imageData.folderId}`
  );
  const folderSnapshot = await getDoc(folderRef);

  if (folderSnapshot.exists()) {
    const currentCount = folderSnapshot.data().imageCount || 0;
    await updateDoc(folderRef, {
      imageCount: Math.max(0, currentCount - 1),
      updatedAt: Timestamp.now(),
    });
  }
};

