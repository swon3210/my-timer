import { useMutation } from "@tanstack/react-query";
import { postAccountItemCategory } from "./fetchers";

export const useAddAccountItemCategoryMutation = () => {
  return useMutation({
    mutationFn: postAccountItemCategory,
  });
};
