import { isServer } from "@tanstack/react-query";
import axios from "axios";

export const API_BASE_URL = isServer
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : window.location.origin;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
