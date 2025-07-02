import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGoals } from "./fetchers";
import { getGoalsQueryKey } from "./useGoalsQuery";

export const useDeleteGoalsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGoals,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGoalsQueryKey() });
    },
  });
};
