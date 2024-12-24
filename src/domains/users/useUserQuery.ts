import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "./fetchers";

export const useUserSuspenseQuery = () => {
  const USER_QUERY_KEY = ["user"] as const;

  return useSuspenseQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser,
    persister: undefined,
    initialData: undefined,
    initialDataUpdatedAt: undefined,
  });
};

export const useUserQuery = () => {
  const USER_QUERY_KEY = ["user"] as const;

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser,
  });
};

export const useSettingsQuery = () => {
  const USER_QUERY_KEY = ["user"] as const;

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser,
  });
};
