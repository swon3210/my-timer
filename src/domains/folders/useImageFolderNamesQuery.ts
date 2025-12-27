import { useQuery } from "@tanstack/react-query";
import { getImageFolderNames } from "./fetchers";
import { useUserQuery } from "@/domains/users/useUserQuery";

export const getImageFolderNamesQueryKey = (categoryName: string | null) =>
  ["folders", { categoryName }] as const;

const useImageFolderNamesQuery = ({
  categoryName,
}: {
  categoryName: string | null;
}) => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: getImageFolderNamesQueryKey(categoryName),
    queryFn: () => {
      if (!user) throw new Error("User not found");
      return getImageFolderNames({ categoryName, user });
    },
    select: (data) => data.map((folder) => folder.split("/").pop() ?? ""),
    enabled: categoryName != null && !!user,
    initialData: [],
  });
};

export default useImageFolderNamesQuery;
