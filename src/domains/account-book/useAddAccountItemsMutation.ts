import { useMutation } from "@tanstack/react-query";
import { postAccountItem } from "./fetchers";

export default function useAddAccountItemMutation() {
  return useMutation({
    mutationFn: postAccountItem,
  });
}
