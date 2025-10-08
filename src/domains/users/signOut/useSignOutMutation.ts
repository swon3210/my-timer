import { useMutation } from "@tanstack/react-query";
import { signOut } from "./fetcher";

export default function useSignOutMutation() {
  return useMutation({
    mutationFn: signOut,
  });
}
