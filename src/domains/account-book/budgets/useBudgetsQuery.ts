import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "./fetchers";

export const useBudgetsQuery = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });
};
