import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getAccountItems } from "./fetchers";
import { AccountItem } from "./types";

export const getAccountItemsQueryKey = () => ["account-items"] as const;

export function useAccountItemsQuery() {
  return useQuery<AccountItem[]>({
    queryKey: getAccountItemsQueryKey(),
    queryFn: getAccountItems,
  });
}

export function useAccountItemsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: getAccountItemsQueryKey(),
    queryFn: getAccountItems,
  });
}
