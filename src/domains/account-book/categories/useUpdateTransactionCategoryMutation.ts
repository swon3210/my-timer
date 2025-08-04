import { useMutation } from "@tanstack/react-query";
import { updateTransactionCategory } from "./fetchers";

export default function useUpdateTransactionCategoryMutation() {
  return useMutation({
    mutationFn: updateTransactionCategory,
  });
}
