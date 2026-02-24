import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "@/domains/users/useUserQuery";
import { getImagesByFolderName } from "@/domains/gallery/fetchers";

export const getImagesQueryKey = (
  categoryId: string | null,
  folderName: string | null
) => ["images", { categoryId, folderName }] as const;

/**
 * 특정 폴더의 이미지 URL 목록을 조회합니다.
 * Firestore에서 조회합니다.
 */
const useImagesQuery = ({
  categoryId,
  folderName,
}: {
  categoryId: string | null;
  folderName: string | null;
}) => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: getImagesQueryKey(categoryId, folderName),
    queryFn: async () => {
      if (categoryId == null || folderName == null) {
        throw new Error("categoryId 혹은 folderName 이 비어있습니다");
      }

      // TODO: galleryId + folderName 기반 직접 조회로 추후 개선 가능
      const images = await getImagesByFolderName(
        categoryId,
        decodeURIComponent(folderName)
      );

      // 기존 API 호환성 유지: downloadUrl 배열 반환
      return images.map((image) => image.downloadUrl);
    },
    enabled: categoryId != null && folderName != null && !!user,
    initialData: [],
  });
};

export default useImagesQuery;
