import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "@/domains/users/useUserQuery";
import { getImageFolders } from "@/domains/gallery/fetchers";

export const getImageFolderNamesQueryKey = (categoryId: string | null) =>
  ["folders", { categoryId }] as const;

/**
 * 특정 갤러리(카테고리)의 이미지 폴더 이름 목록을 조회합니다.
 * galleryId 기반으로 변경됨 (galleryName 기반 레거시 쿼리 대체)
 */
const useImageFolderNamesQuery = ({
  categoryId,
}: {
  categoryId: string | null;
}) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: getImageFolderNamesQueryKey(categoryId),
    queryFn: () => {
      if (!categoryId) throw new Error("categoryId is required");
      return getImageFolders(categoryId);
    },
    select: (data) => data.map((folder) => folder.name),
    enabled: categoryId != null && !!user,
    initialData: [],
  });
};

export default useImageFolderNamesQuery;
