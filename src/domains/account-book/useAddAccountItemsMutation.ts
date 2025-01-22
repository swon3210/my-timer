import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAccountItem } from "./fetchers";
import { getAccountItemsQueryKey } from "./useAccountItemsQuery";

export default function useAddAccountItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAccountItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getAccountItemsQueryKey() });
    },
  });
}
