import { axiosInstance } from "@/app/api/fetcher";
import { getSettingsResponseSchema, getUserResponseSchema } from "../schemes";
import api from "@/domains/api";

export const getSettings = async () => {
  const response = await axiosInstance.get("/api/settings");

  const { appSettings } = getSettingsResponseSchema.parse(response.data);

  return appSettings;
};

export const getUser = async () => {
  const response = await api.get("/api/users");

  const { user } = getUserResponseSchema.parse(response.data);

  return user;
};
