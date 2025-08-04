import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getGoals } from "./fetchers";

export const getGoalsQueryKey = () => ["goals"];

export const useGoalsQuery = () => {
  return useQuery({
    queryKey: getGoalsQueryKey(),
    queryFn: getGoals,
  });
};

export const useGoalsSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: getGoalsQueryKey(),
    queryFn: getGoals,
  });
};
