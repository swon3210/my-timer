import { createFetcher } from "@/lib/fetcher/create";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? window.location.origin;

const api = createFetcher(API_BASE_URL);

export const DEFAULT_QUERY_KEY = "API";

export default api;
