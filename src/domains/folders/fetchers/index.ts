import { axiosInstance } from "@/app/api/fetcher";
import { getFolderNamesResponseSchema } from "../schema";

export const getImageFolderNames = async ({
  categoryName,
}: {
  categoryName: string | null;
}) => {
  if (categoryName == null) {
    throw new Error("categoryName 이 비어있습니다");
  }

  // TODO : 예외처리
  const response = await axiosInstance.get("/api/folders", {
    params: {
      path: `images/${categoryName}`,
    },
  });

  const { folders } = getFolderNamesResponseSchema.parse(response.data);

  return folders;
};

export const getFolderNames = async () => {
  const response = await axiosInstance.get("/api/folders", {
    params: {
      path: `images`,
    },
  });

  const { folders } = getFolderNamesResponseSchema.parse(response.data);

  return folders;
};

export const deleteFolders = async ({ paths }: { paths: string[] }) => {
  const response = await axiosInstance.delete("/api/folders", {
    params: {
      paths,
    },
  });

  return response.data;
};
