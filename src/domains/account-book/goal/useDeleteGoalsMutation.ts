import { useMutation } from "@tanstack/react-query";
import { deleteGoals } from "./fetchers";

export const useDeleteGoalsMutation = () => {
  return useMutation({
    mutationFn: deleteGoals,
  });
};
