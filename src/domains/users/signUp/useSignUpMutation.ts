import { useMutation } from "@tanstack/react-query";
import { signUp } from "./fetcher";

export default function useSignUpMutation() {
  return useMutation({
    mutationFn: signUp,
  });
}
