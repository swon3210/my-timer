import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAccountItemCategory } from "./fetchers";
import { getAccountItemCategoriesQueryKey } from "./useAccountItemCategoriesQuery";

export const useAddAccountItemCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAccountItemCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAccountItemCategoriesQueryKey(),
      });
    },
  });
};
