import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchGoals } from "./fetchers";
import { getGoalsQueryKey } from "./useGoalsQuery";

export const useUpdateGoalsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchGoals,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGoalsQueryKey() });
    },
  });
};
