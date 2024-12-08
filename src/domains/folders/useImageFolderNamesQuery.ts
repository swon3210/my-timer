import { useQuery } from "@tanstack/react-query";
import { getImageFolderNames } from "./fetchers";

export const getImageFolderNamesQueryKey = (categoryName: string | null) =>
  ["folders", { categoryName }] as const;

const useImageFolderNamesQuery = ({
  categoryName,
}: {
  categoryName: string | null;
}) => {
  return useQuery({
    queryKey: getImageFolderNamesQueryKey(categoryName),
    queryFn: () => getImageFolderNames({ categoryName }),
    select: (data) => data.map((folder) => folder.split("/").pop() ?? ""),
    enabled: categoryName != null,
    initialData: [],
  });
};

export default useImageFolderNamesQuery;
