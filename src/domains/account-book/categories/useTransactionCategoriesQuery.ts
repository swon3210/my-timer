import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionCategories } from "./fetchers";
import { Category } from "@/app/api/account-books/categories/types";

export const getTransactionCategoriesQueryKey = () => [
  "transaction-categories",
];

export default function useTransactionCategoriesQuery() {
  return useQuery({
    queryKey: getTransactionCategoriesQueryKey(),
    queryFn: getTransactionCategories,
  });
}

export function useSetTransactionCategories() {
  const queryClient = useQueryClient();

  const setTransactionCategories = (
    mutate: (categories: Category[]) => Category[]
  ) => {
    queryClient.setQueryData(
      getTransactionCategoriesQueryKey(),
      (oldData: Category[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return mutate(oldData);
      }
    );
  };

  return {
    setTransactionCategories,
  };
}
