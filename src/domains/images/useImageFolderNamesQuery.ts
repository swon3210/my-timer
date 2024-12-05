import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const getFolderNamesResponseSchema = z.object({
  folders: z.array(z.string()),
});

export const getImageFolderNamesQueryKey = (categoryName: string | null) =>
  ["folders", { categoryName }] as const;

export const useImageFolderNamesQuery = ({
  categoryName,
}: {
  categoryName: string | null;
}) => {
  return useQuery({
    queryKey: getImageFolderNamesQueryKey(categoryName),
    queryFn: async ({ queryKey: [, { categoryName }] }) => {
      if (categoryName == null) {
        throw new Error("categoryName 이 비어있습니다");
      }

      // TODO : 예외처리
      const response = await axiosInstance.get("/api/folders", {
        params: {
          path: `/images/${decodeURIComponent(categoryName)}`,
        },
      });

      const { folders } = getFolderNamesResponseSchema.parse(response.data);

      return folders;
    },
    select: (data) => data.map((folder) => folder.split("/").pop() ?? ""),
    enabled: categoryName != null,
    initialData: [],
  });
};

export const getCategoryNamesQueryKey = () => ["categories"] as const;

export const useCategoryNamesQuery = () => {
  return useQuery({
    queryKey: getCategoryNamesQueryKey(),
    queryFn: async () => {
      // TODO : 예외처리
      const response = await axiosInstance.get("/api/folders", {
        params: {
          path: `/images`,
        },
      });

      const { folders } = getFolderNamesResponseSchema.parse(response.data);

      return folders;
    },
    select: (data) => data?.map((folder) => folder.split("/").pop()),
    initialData: [],
  });
};
