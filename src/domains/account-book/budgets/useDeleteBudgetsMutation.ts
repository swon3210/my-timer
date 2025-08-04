import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget } from "./fetchers";
import { getBudgetsQueryKey } from "./useBudgetsQuery";

export const useDeleteBudgetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getBudgetsQueryKey() });
    },
  });
};
