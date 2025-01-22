import { useMutation } from "@tanstack/react-query";
import { patchBudget } from "./fetchers";

export const useUpdateBudgetsMutation = () => {
  return useMutation({
    mutationFn: patchBudget,
  });
};
