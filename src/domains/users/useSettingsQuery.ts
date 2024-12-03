import { axiosInstance } from "@/lib/api";
import { appSettingsSchema } from "@/lib/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

const getSettingsResponseSchema = z.object({
  appSettings: appSettingsSchema,
});

export const useSettingsSuspenseQuery = () => {
  const SETTINGS_QUERY_KEY = ["settings"] as const;

  return useSuspenseQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosInstance.get("/api/settings");

      const { appSettings } = getSettingsResponseSchema.parse(response.data);

      return appSettings;
    },
    persister: undefined,
    initialData: undefined,
    initialDataUpdatedAt: undefined,
  });
};

export const useSettingsQuery = () => {
  const SETTINGS_QUERY_KEY = ["settings"] as const;

  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosInstance.get("/api/settings");

      const { appSettings } = getSettingsResponseSchema.parse(response.data);

      return appSettings;
    },
  });
};
