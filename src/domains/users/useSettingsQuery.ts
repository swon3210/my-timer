import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getSettings } from "./fetchers";

export const useSettingsSuspenseQuery = () => {
  const SETTINGS_QUERY_KEY = ["settings"] as const;

  return useSuspenseQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: getSettings,
    persister: undefined,
    initialData: undefined,
    initialDataUpdatedAt: undefined,
  });
};

export const useSettingsQuery = () => {
  const SETTINGS_QUERY_KEY = ["settings"] as const;

  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: getSettings,
  });
};
