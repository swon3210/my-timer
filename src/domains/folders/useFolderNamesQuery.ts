import { useQuery } from "@tanstack/react-query";
import { getFolderNames } from "./fetchers";
import { useUserQuery } from "@/domains/users/useUserQuery";

export const getFolderNamesQueryKey = () => ["categories"] as const;

const useFolderNamesQuery = () => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: getFolderNamesQueryKey(),
    queryFn: () => {
      if (!user) throw new Error("User not found");
      return getFolderNames({ user });
    },
    select: (data) => data?.map((folder) => folder.split("/").pop() ?? ""),
    initialData: [],
    enabled: !!user,
  });
};

export default useFolderNamesQuery;
