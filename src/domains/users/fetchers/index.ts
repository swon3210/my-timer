import { axiosInstance } from "@/lib/api";
import { getSettingsResponseSchema, getUserResponseSchema } from "../schemes";

export const getSettings = async () => {
  const response = await axiosInstance.get("/api/settings");

  const { appSettings } = getSettingsResponseSchema.parse(response.data);

  return appSettings;
};

export const getUser = async () => {
  const response = await axiosInstance.get("/api/users");

  const { user } = getUserResponseSchema.parse(response.data);

  return user;
};

export const signOut = async () => {
  const response = await axiosInstance.post("/api/auth/sign-out");

  return response.data;
};
