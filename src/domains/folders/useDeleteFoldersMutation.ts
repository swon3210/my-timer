import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolders as deleteStorageFolders } from "./fetchers";
import {
  deleteGallery,
  deleteImageFolder,
  getGalleries,
  getImageFoldersByGalleryName,
} from "@/domains/gallery/fetchers";
import { getFolderNamesQueryKey } from "./useFolderNamesQuery";
import { getImageFolderNamesQueryKey } from "./useImageFolderNamesQuery";
import { deleteFolders as deleteStorageFoldersFromFirebase } from "@/lib/firebase";

interface DeleteFoldersParams {
  paths: string[];
  isImageFolder?: boolean;
  galleryName?: string;
}

/**
 * 폴더를 삭제합니다.
 * Storage와 Firestore 모두에서 삭제합니다.
 */
const useDeleteFoldersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paths, isImageFolder, galleryName }: DeleteFoldersParams) => {
      // Storage에서 삭제 (기존 로직 유지)
      await deleteStorageFoldersFromFirebase(paths);

      // Firestore에서도 삭제
      for (const path of paths) {
        const folderName = path.split("/").pop() ?? "";

        if (isImageFolder && galleryName) {
          // 이미지 폴더 삭제
          const folders = await getImageFoldersByGalleryName(galleryName);
          const folder = folders.find((f) => f.name === folderName);
          if (folder) {
            await deleteImageFolder(folder.id);
          }
        } else {
          // 갤러리(카테고리) 삭제
          const galleries = await getGalleries();
          const gallery = galleries.find((g) => g.name === folderName);
          if (gallery) {
            await deleteGallery(gallery.id);
          }
        }
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: getFolderNamesQueryKey() });
      if (variables.galleryName) {
        queryClient.invalidateQueries({
          queryKey: getImageFolderNamesQueryKey(variables.galleryName),
        });
      }
    },
  });
};

export default useDeleteFoldersMutation;
