import { useMutation } from "@tanstack/react-query";
import { postTransactionCategory } from "./fetchers";

export const useAddTransactionCategoryMutation = () => {
  return useMutation({
    mutationFn: postTransactionCategory,
  });
};
