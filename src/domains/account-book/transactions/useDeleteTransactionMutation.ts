import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "./fetchers";
import { getTransactionsQueryKey } from "./useTransactionsQuery";

export default function useDeleteTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTransactionsQueryKey() });
    },
  });
}
