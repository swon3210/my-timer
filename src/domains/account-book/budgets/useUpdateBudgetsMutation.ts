import { useMutation } from "@tanstack/react-query";
import { patchBudget } from "./fetchers";

export const useUpdateBudgetMutation = () => {
  return useMutation({
    mutationFn: patchBudget,
  });
};
