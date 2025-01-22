import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBudget } from "./fetchers";
import { getBudgetsQueryKey } from "./useBudgetsQuery";

export const useAddBudgetsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getBudgetsQueryKey() });
    },
  });
};
