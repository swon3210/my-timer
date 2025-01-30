import { useMutation } from "@tanstack/react-query";
import { postBudget } from "./fetchers";

export const useAddBudgetsMutation = () => {
  return useMutation({
    mutationFn: postBudget,
  });
};
