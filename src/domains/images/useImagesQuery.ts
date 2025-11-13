import { useUser } from "@/app/_providers/UserProvider";
import { getImageListFromFolder, getUserStoragePath } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";

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
  const user = useUser();

  return useQuery({
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    queryKey: getImagesQueryKey(categoryName, folderName),
    queryFn: async ({ queryKey: [, { categoryName, folderName }] }) => {
      if (categoryName == null || folderName == null) {
        throw new Error("categoryName 혹은 folderName 이 비어있습니다");
      }

      const userStoragePath = getUserStoragePath(
        user,
        `images/${categoryName}/${folderName}`
      );

      const images = await getImageListFromFolder(
        decodeURIComponent(userStoragePath)
      );

      return images ?? [];
    },
    enabled: categoryName != null && folderName != null,
  });
};

export default useImagesQuery;
