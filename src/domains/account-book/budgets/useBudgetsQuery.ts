import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "./fetchers";

export const getBudgetsQueryKey = () => ["budgets"];

export const useBudgetsQuery = () => {
  return useQuery({
    queryKey: getBudgetsQueryKey(),
    queryFn: getBudgets,
  });
};
