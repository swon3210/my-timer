import { axiosInstance } from "@/lib/api";
import {
  checkAuthResponseSchema,
  getSettingsResponseSchema,
  getUserResponseSchema,
} from "../schemes";

export const checkAuth = async (sessionCookie: string) => {
  const response = await axiosInstance.get("/api/auth/check", {
    headers: {
      Cookie: sessionCookie,
    },
  });

  const { success, error } = checkAuthResponseSchema.parse(response.data);

  return { success, error };
};

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
