import { useQuery } from "@tanstack/react-query";
import { getImageFoldersByGalleryName } from "./fetchers";
import { useUserQuery } from "@/domains/users/useUserQuery";

export const getImageFoldersQueryKey = (galleryName: string | null) =>
  ["imageFolders", { galleryName }] as const;

export const useImageFoldersQuery = ({
  galleryName,
}: {
  galleryName: string | null;
}) => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: getImageFoldersQueryKey(galleryName),
    queryFn: () => {
      if (!galleryName) throw new Error("galleryName is required");
      return getImageFoldersByGalleryName(galleryName);
    },
    enabled: !!user && !!galleryName,
  });
};

