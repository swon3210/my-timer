import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.ORIGIN ? process.env.ORIGIN : "http://localhost:3000",
});
