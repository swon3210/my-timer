import { useQuery } from "@tanstack/react-query";
import { getImagesByFolderName } from "./fetchers";
import { useUserQuery } from "@/domains/users/useUserQuery";

export const getGalleryImagesQueryKey = (
  galleryName: string | null,
  folderName: string | null
) => ["galleryImages", { galleryName, folderName }] as const;

export const useGalleryImagesQuery = ({
  galleryName,
  folderName,
}: {
  galleryName: string | null;
  folderName: string | null;
}) => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: getGalleryImagesQueryKey(galleryName, folderName),
    queryFn: () => {
      if (!galleryName || !folderName) {
        throw new Error("galleryName and folderName are required");
      }
      return getImagesByFolderName(galleryName, folderName);
    },
    enabled: !!user && !!galleryName && !!folderName,
  });
};

