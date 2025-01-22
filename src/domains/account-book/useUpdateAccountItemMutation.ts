import { useMutation } from "@tanstack/react-query";
import { updateAccountItem } from "./fetchers";

export default function useUpdateAccountItemMutation() {
  return useMutation({
    mutationFn: updateAccountItem,
  });
}
