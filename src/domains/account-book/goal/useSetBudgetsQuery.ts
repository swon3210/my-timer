import { useQueryClient } from "@tanstack/react-query";
import { Goal } from "@/domains/account-book/goal/types";
import { getGoalsQueryKey } from "./useGoalsQuery";

export function useSetGoalsQuery() {
  const queryClient = useQueryClient();

  const setGoals = (mutate: (goals: Goal[]) => Goal[]) => {
    queryClient.setQueryData(
      getGoalsQueryKey(),
      (oldData: Goal[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return mutate(oldData);
      }
    );
  };

  return { setGoals };
}
