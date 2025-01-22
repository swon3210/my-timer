import { useMutation } from "@tanstack/react-query";
import { deleteAccountItem } from "./fetchers";

export default function useDeleteAccountItemMutation() {
  return useMutation({
    mutationFn: deleteAccountItem,
  });
}
