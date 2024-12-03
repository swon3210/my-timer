import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const getImagesQueryKey = (
  categoryName: string | null,
  folderName: string | null
) => ["images", { categoryName, folderName }] as const;

const getImageUrlsResponseSchema = z.object({
  images: z.array(z.string()),
});

const useImagesQuery = ({
  categoryName,
  folderName,
}: {
  categoryName: string | null;
  folderName: string | null;
}) => {
  return useQuery({
    queryKey: getImagesQueryKey(categoryName, folderName),
    queryFn: async ({ queryKey: [, { categoryName, folderName }] }) => {
      if (categoryName == null || folderName == null) {
        throw new Error("categoryName 혹은 folderName 이 비어있습니다");
      }

      // TODO : 예외처리
      const response = await axiosInstance.get("/api/folders/images", {
        params: {
          path: `/images/${decodeURIComponent(
            categoryName
          )}/${decodeURIComponent(folderName)}`,
        },
      });

      const { images } = getImageUrlsResponseSchema.parse(response.data);

      return images;
    },
    enabled: categoryName != null && folderName != null,
  });
};

export default useImagesQuery;
