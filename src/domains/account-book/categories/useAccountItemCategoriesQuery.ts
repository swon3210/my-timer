import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccountItemsCategories } from "./fetchers";
import { Category } from "./types";

export const getAccountItemCategoriesQueryKey = () => [
  "account-item-categories",
];

export default function useAccountItemCategoriesQuery() {
  return useQuery({
    queryKey: getAccountItemCategoriesQueryKey(),
    queryFn: getAccountItemsCategories,
  });
}

export function useSetAccountItemCategories() {
  const queryClient = useQueryClient();

  const setAccountItemCategories = (
    mutate: (categories: Category[]) => Category[]
  ) => {
    queryClient.setQueryData(
      getAccountItemCategoriesQueryKey(),
      (oldData: Category[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return mutate(oldData);
      }
    );
  };

  return {
    setAccountItemCategories,
  };
}
