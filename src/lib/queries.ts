import { getFolderList, getImageListFromFolder } from "@/firebase";
import { useQuery } from "@tanstack/react-query";

export const useImagesQuery = ({
  categoryName,
  folderName,
}: {
  categoryName: string | null;
  folderName: string | null;
}) => {
  const IMAGE_QUERY_KEY = ["images", { categoryName, folderName }] as const;

  return useQuery({
    queryKey: IMAGE_QUERY_KEY,
    queryFn: async ({ queryKey: [, { categoryName, folderName }] }) => {
      if (categoryName == null || folderName == null) {
        throw new Error("categoryName or folderName is null");
      }

      const response = await getImageListFromFolder(
        `/images/${decodeURIComponent(categoryName)}/${decodeURIComponent(
          folderName
        )}`
      );
      return response;
    },
    enabled: categoryName != null && folderName != null,
  });
};

export const useFolderNamesQuery = ({
  categoryName,
}: {
  categoryName: string | null;
}) => {
  const IMAGE_QUERY_KEY = ["folders", { categoryName }] as const;

  return useQuery({
    queryKey: IMAGE_QUERY_KEY,
    queryFn: async ({ queryKey: [, { categoryName }] }) => {
      const response = await getFolderList(`/images/${categoryName}`);
      return response;
    },
    enabled: categoryName != null,
    // TODO : 타입 정합성 맞추기
    select: (data) =>
      (data?.map((folder) => folder.split("/").pop()) ?? []) as string[],
  });
};

export const useCategoryNamesQuery = () => {
  const IMAGE_QUERY_KEY = ["categories"] as const;

  return useQuery({
    queryKey: IMAGE_QUERY_KEY,
    queryFn: async () => {
      const response = await getFolderList(`/images`);
      return response;
    },
    select: (data) => data?.map((folder) => folder.split("/").pop()),
  });
};
