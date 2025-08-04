import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getSavings } from "./fetchers";

export const getSavingsQueryKey = () => ["savings"];

export const useSavingsQuery = () => {
  return useQuery({
    queryKey: getSavingsQueryKey(),
    queryFn: getSavings,
  });
};

export const useSavingsSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: getSavingsQueryKey(),
    queryFn: getSavings,
  });
};
