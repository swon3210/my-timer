import { axiosInstance } from "@/lib/api";
import { checkAuthResponseSchema, getSettingsResponseSchema } from "../schemes";

export const checkAuth = async () => {
  const response = await axiosInstance.get("/api/auth/check");

  const { success, error } = checkAuthResponseSchema.parse(response.data);

  return { success, error };
};

export const getSettings = async () => {
  const response = await axiosInstance.get("/api/settings");

  const { appSettings } = getSettingsResponseSchema.parse(response.data);

  return appSettings;
};
