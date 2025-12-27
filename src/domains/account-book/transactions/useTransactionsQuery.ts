import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getTransactions } from "./fetchers";
import { Transaction } from "@/domains/account-book/transactions/types";

export const getTransactionsQueryKey = () => ["transactions"] as const;

export function useTransactionsQuery() {
  return useQuery<Transaction[]>({
    queryKey: getTransactionsQueryKey(),
    queryFn: getTransactions,
  });
}

export function useTransactionsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: getTransactionsQueryKey(),
    queryFn: getTransactions,
  });
}

export function useSetTransactions() {
  const queryClient = useQueryClient();

  const setTransactions = (mutate: (items: Transaction[]) => Transaction[]) => {
    queryClient.setQueryData(getTransactionsQueryKey(), mutate);
  };

  return { setTransactions };
}
