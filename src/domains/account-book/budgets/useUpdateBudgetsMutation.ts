import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBudget } from "./fetchers";
import { getBudgetsQueryKey } from "./useBudgetsQuery";

export const useUpdateBudgetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getBudgetsQueryKey() });
    },
  });
};
