import { isServer } from "@tanstack/react-query";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: isServer ? undefined : window.location.origin,
});
