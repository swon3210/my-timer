import { useMutation } from "@tanstack/react-query";
import { deleteTransactionCategory } from "./fetchers";

export const useDeleteTransactionCategoryMutation = () => {
  return useMutation({
    mutationFn: deleteTransactionCategory,
  });
};
