import { isServer } from "@tanstack/react-query";
import axios from "axios";

export const API_BASE_URL = isServer
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : window.location.origin;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
