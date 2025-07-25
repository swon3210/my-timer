import { useQueryClient } from "@tanstack/react-query";
import { Budget } from "@/app/api/account-books/budgets/type";
import { getBudgetsQueryKey } from "./useBudgetsQuery";

export function useSetBudgetsQuery() {
  const queryClient = useQueryClient();

  const setBudgets = (mutate: (budgets: Budget[]) => Budget[]) => {
    queryClient.setQueryData(
      getBudgetsQueryKey(),
      (oldData: Budget[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return mutate(oldData);
      }
    );
  };

  return { setBudgets };
}
