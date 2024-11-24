import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AppSettings } from "./types";
import { axiosInstance } from "./api";

export const useSaveAppSettingsMutation = (
  options?: UseMutationOptions<AppSettings, unknown, AppSettings>
) => {
  return useMutation({
    mutationFn: async (appSettings) => {
      const response = await axiosInstance.post("/api/settings", appSettings);

      return response.data;
    },
    ...options,
  });
};

type AddFolderMutationProps = {
  path: string;
  image: File;
};

export const useAddFolderMutation = (
  options?: UseMutationOptions<unknown, unknown, AddFolderMutationProps>
) => {
  return useMutation({
    mutationFn: async (props) => {
      const response = await axiosInstance.post("/api/folders", props);

      return response.data;
    },
    ...options,
  });
};
