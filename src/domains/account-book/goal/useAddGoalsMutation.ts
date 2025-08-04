import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postGoals } from "./fetchers";
import { getGoalsQueryKey } from "./useGoalsQuery";

export const useAddGoalsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postGoals,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGoalsQueryKey() });
    },
  });
};
