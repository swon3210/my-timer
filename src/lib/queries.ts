"use client";

import { QueryKey, useQueryClient } from "@tanstack/react-query";

// TODO : QueryKey Name 타입 추가 필요
export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  // queryKey 배열의 앞부분만 일치해도 하위 캐시를 모두 무효화하도록 설정
  return (queryKey: QueryKey) =>
    queryClient.invalidateQueries({ queryKey, exact: false });
};
