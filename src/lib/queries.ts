"use client";

import { QueryKey, useQueryClient } from "@tanstack/react-query";

// TODO : QueryKey Name 타입 추가 필요
export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  return (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey });
};
