import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "@/domains/users/useUserQuery";
import { getGalleries } from "@/domains/gallery/fetchers";

export const getFolderNamesQueryKey = () => ["categories"] as const;

/**
 * 갤러리(카테고리) 이름 목록을 조회합니다.
 * Firestore 기반으로 변경됨 (기존 Storage listAll 대체)
 */
const useFolderNamesQuery = () => {
  const { data: user } = useUserQuery();

  console.log('user', user)

  return useQuery({
    queryKey: getFolderNamesQueryKey(),
    queryFn: getGalleries,
    select: (data) => data?.map((gallery) => gallery.name) ?? [],
    initialData: [],
    enabled: !!user,
  });
};

export default useFolderNamesQuery;
