import { useQuery } from "@tanstack/react-query";
import { getAccountItemsCategories } from "./fetchers";

export const getAccountItemCategoriesQueryKey = () => [
  "account-item-categories",
];

export default function useAccountItemCategoriesQuery() {
  return useQuery({
    queryKey: getAccountItemCategoriesQueryKey(),
    queryFn: getAccountItemsCategories,
  });
}
