import { useQuery } from "@tanstack/react-query";
import { getFolderNames } from "./fetchers";

export const getFolderNamesQueryKey = () => ["categories"] as const;

const useFolderNamesQuery = () => {
  return useQuery({
    queryKey: getFolderNamesQueryKey(),
    queryFn: getFolderNames,
    select: (data) => data?.map((folder) => folder.split("/").pop() ?? ""),
    initialData: [],
  });
};

export default useFolderNamesQuery;
