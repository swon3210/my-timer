import { useMutation } from "@tanstack/react-query";
import { updateAccountItemCategory } from "./fetchers";

export default function useUpdateAccountItemCategoryMutation() {
  return useMutation({
    mutationFn: updateAccountItemCategory,
  });
}
