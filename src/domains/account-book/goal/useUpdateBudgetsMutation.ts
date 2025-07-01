import { useMutation } from "@tanstack/react-query";
import { patchGoals } from "./fetchers";

export const useUpdateGoalsMutation = () => {
  return useMutation({
    mutationFn: patchGoals,
  });
};
