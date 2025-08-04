import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "./fetchers";
import { getTransactionsQueryKey } from "./useTransactionsQuery";

export default function useAddTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTransactionsQueryKey() });
    },
  });
}
