import { useQuery } from "@tanstack/react-query";
import { getGalleries } from "./fetchers";
import { useUserQuery } from "@/domains/users/useUserQuery";

export const getGalleriesQueryKey = () => ["galleries"] as const;

export const useGalleriesQuery = () => {
  const { data: user } = useUserQuery();

  console.log("user", user);

  return useQuery({
    queryKey: getGalleriesQueryKey(),
    queryFn: getGalleries,
    enabled: !!user,
  });
};

