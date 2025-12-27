import { useQuery } from "@tanstack/react-query";
import {
  getImageListFromFolder,
  getUserStoragePath,
} from "@/lib/firebase";
import { useUserQuery } from "@/domains/users/useUserQuery";

export const getImagesQueryKey = (
  categoryName: string | null,
  folderName: string | null
) => ["images", { categoryName, folderName }] as const;

const useImagesQuery = ({
  categoryName,
  folderName,
}: {
  categoryName: string | null;
  folderName: string | null;
}) => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: getImagesQueryKey(categoryName, folderName),
    queryFn: async () => {
      if (categoryName == null || folderName == null) {
        throw new Error("categoryName 혹은 folderName 이 비어있습니다");
      }

      if (!user) {
        throw new Error("유저 정보가 없습니다");
      }

      const path = `images/${categoryName}/${folderName}`;

      const userStoragePath = getUserStoragePath(user, decodeURIComponent(path));

      const images = await getImageListFromFolder(userStoragePath);

      return images ?? [];
    },
    enabled: categoryName != null && folderName != null && !!user,
    initialData: [],
  });
};

export default useImagesQuery;
