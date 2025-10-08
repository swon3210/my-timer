import { createFetcher } from "@/lib/fetcher/create";
import { createSession } from "./users/signIn/fetcher";
import { getRefreshToken } from "@/lib/firebase/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? window.location.origin;

const api = createFetcher(API_BASE_URL);

// 401 에러 발생 시 리프레시 토큰 사용해서 새로운 세션 생성
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const idToken = await getRefreshToken();

      if (!idToken) {
        throw error;
      }

      await createSession({ idToken });
      return api.request(error.config);
    }
  }
);

export const DEFAULT_QUERY_KEY = "API";

export default api;
