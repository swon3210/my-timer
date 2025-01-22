import { useMutation } from "@tanstack/react-query";
import { deleteBudget } from "./fetchers";

export const useDeleteBudgetsMutation = () => {
  return useMutation({
    mutationFn: deleteBudget,
  });
};
