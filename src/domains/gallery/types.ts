import { Timestamp } from "firebase/firestore";

/**
 * 갤러리 카테고리 (최상위 폴더)
 * Firestore: users/{userId}/galleries/{galleryId}
 */
export interface Gallery {
  id: string;
  name: string;
  folderCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateGalleryInput = Omit<
  Gallery,
  "id" | "folderCount" | "createdAt" | "updatedAt"
>;

/**
 * 이미지 폴더 (카테고리 하위의 폴더)
 * Firestore: users/{userId}/imageFolders/{folderId}
 */
export interface ImageFolder {
  id: string;
  galleryId: string;
  galleryName: string;
  name: string;
  imageCount: number;
  thumbnailUrl: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateImageFolderInput = Omit<
  ImageFolder,
  "id" | "imageCount" | "thumbnailUrl" | "createdAt" | "updatedAt"
>;

/**
 * 이미지 메타데이터
 * Firestore: users/{userId}/images/{imageId}
 */
export interface GalleryImage {
  id: string;
  galleryId: string;
  folderId: string;
  fileName: string;
  downloadUrl: string;
  storagePath: string;
  order: number;
  createdAt: Timestamp;
}

export type CreateGalleryImageInput = Omit<GalleryImage, "id" | "createdAt">;

/**
 * Firestore 데이터를 클라이언트용으로 변환
 */
export const toGallery = (
  id: string,
  data: Omit<Gallery, "id">
): Gallery => ({
  ...data,
  id,
});

export const toImageFolder = (
  id: string,
  data: Omit<ImageFolder, "id">
): ImageFolder => ({
  ...data,
  id,
});

export const toGalleryImage = (
  id: string,
  data: Omit<GalleryImage, "id">
): GalleryImage => ({
  ...data,
  id,
});

