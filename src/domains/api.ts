import { createFetcher } from "@/lib/fetcher/create";

import { getRefreshToken } from "@/lib/firebase/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? window.location.origin;

const api = createFetcher(API_BASE_URL);

// 401 에러 발생 시 리프레시 토큰 사용해서 새로운 세션 생성 로직 제거됨 (Client SDK 사용으로 불필요)
// api.interceptors.response.use(...)

export const DEFAULT_QUERY_KEY = "API";

export default api;
