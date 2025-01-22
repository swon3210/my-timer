import { useMutation } from "@tanstack/react-query";
import { deleteAccountItemCategory } from "./fetchers";

export const useDeleteAccountItemCategoryMutation = () => {
  return useMutation({
    mutationFn: deleteAccountItemCategory,
  });
};
