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

type AddImagesMutationProps = {
  path: string;
  images: File[];
};

export const useAddImagesMutation = (
  options?: UseMutationOptions<unknown, unknown, AddImagesMutationProps>
) => {
  return useMutation({
    mutationFn: async (props) => {
      const formData = new FormData();
      formData.append("path", props.path);
      props.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axiosInstance.post(
        "/api/folders/images",
        formData
      );

      return response.data;
    },
    ...options,
  });
};
