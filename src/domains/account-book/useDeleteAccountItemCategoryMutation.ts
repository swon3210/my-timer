import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccountItemCategory } from "./fetchers";
import { getAccountItemCategoriesQueryKey } from "./useAccountItemCategoriesQuery";

export default function useDeleteAccountItemCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccountItemCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAccountItemCategoriesQueryKey(),
      });
    },
  });
}
