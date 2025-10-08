import axios from "axios";

export const createFetcher = (baseURL: string) =>
  axios.create({
    baseURL,
    withCredentials: true,
    paramsSerializer: (params) => {
      return Object.entries(params)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}=${value.join(",")}`;
          }

          return `${key}=${value}`;
        })
        .join("&");
    },
  });
