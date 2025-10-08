import { useMutation } from "@tanstack/react-query";
import { signIn } from "./fetcher";

export default function usePostSignInMutation() {
  return useMutation({
    mutationFn: signIn,
  });
}
