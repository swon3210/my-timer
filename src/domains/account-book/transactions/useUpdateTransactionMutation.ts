import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "./fetchers";
import { getTransactionsQueryKey } from "./useTransactionsQuery";

export default function useUpdateTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTransactionsQueryKey() });
    },
  });
}
