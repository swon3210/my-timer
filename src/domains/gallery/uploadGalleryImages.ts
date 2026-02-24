import { uploadImages, getUserStoragePath } from "@/lib/firebase";
import { getCurrentUser } from "@/lib/firebase/auth";
import { createGalleryImages, getImagesByFolderName } from "./fetchers";
import { CreateGalleryImageInput, GalleryImage } from "./types";

interface UploadGalleryImagesParams {
  galleryId: string;
  galleryName: string;
  folderId: string;
  folderName: string;
  files: File[];
}

interface UploadGalleryImagesResult {
  uploadedImages: GalleryImage[];
  failedFiles: File[];
}

/**
 * 이미지를 Storage에 업로드하고 Firestore에 메타데이터를 저장합니다.
 * 기존 uploadImages를 대체하는 통합 함수입니다.
 */
export const uploadGalleryImages = async ({
  galleryId,
  galleryName,
  folderId,
  folderName,
  files,
}: UploadGalleryImagesParams): Promise<UploadGalleryImagesResult> => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const storagePath = getUserStoragePath(
    {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
    },
    `images/${galleryName}/${folderName}`
  );

  // 1. Storage에 이미지 업로드
  const uploadResults = await uploadImages(storagePath, files);

  // 2. 기존 이미지 개수 조회 (order 계산용)
  const existingImages = await getImagesByFolderName(galleryName, folderName);
  const startOrder = existingImages.length;

  // 3. Firestore에 메타데이터 저장
  const imageInputs: CreateGalleryImageInput[] = uploadResults.map(
    (result, index) => ({
      galleryId,
      folderId,
      fileName: result.fileName,
      downloadUrl: result.downloadURL,
      storagePath: `${storagePath}/${result.fileName}`,
      order: startOrder + index,
    })
  );

  const uploadedImages = await createGalleryImages(imageInputs);

  return {
    uploadedImages,
    failedFiles: [], // TODO: 실패한 파일 추적
  };
};

/**
 * 새 폴더를 만들면서 이미지를 업로드합니다.
 * 갤러리 ID와 폴더 ID가 없는 경우 사용합니다.
 */
export const uploadGalleryImagesWithNewFolder = async ({
  galleryId,
  galleryName,
  folderName,
  files,
  onFolderCreated,
}: {
  galleryId: string;
  galleryName: string;
  folderName: string;
  files: File[];
  onFolderCreated?: (folderId: string) => void;
}): Promise<UploadGalleryImagesResult> => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // 폴더 생성
  const { createImageFolder } = await import("./fetchers");
  const folder = await createImageFolder({
    galleryId,
    galleryName,
    name: folderName,
  });

  onFolderCreated?.(folder.id);

  // 이미지 업로드
  return uploadGalleryImages({
    galleryId,
    galleryName,
    folderId: folder.id,
    folderName,
    files,
  });
};

