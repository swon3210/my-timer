import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AppSettings } from "./types";
import { axiosInstance } from "./api";

export const useSaveAppSettingsMutation = (
  options?: UseMutationOptions<AppSettings, unknown, AppSettings>
) => {
  return useMutation({
    mutationFn: async (appSettings: AppSettings) => {
      const response = await axiosInstance.post("/api/settings", appSettings);

      return response.data;
    },
    ...options,
  });
};
