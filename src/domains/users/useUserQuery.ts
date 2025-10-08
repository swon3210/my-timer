import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "./fetchers";
import { User } from "@/lib/types";

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

type UserQueryOptions = Omit<
  NonNullable<Parameters<typeof useQuery<User>>[0]>,
  "queryKey" | "queryFn"
>;

export const useUserQuery = (options?: UserQueryOptions) => {
  const USER_QUERY_KEY = ["user"] as const;

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser,
    ...options,
  });
};

export const useSettingsQuery = () => {
  const USER_QUERY_KEY = ["user"] as const;

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser,
  });
};
