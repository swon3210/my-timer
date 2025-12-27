import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AppSettings } from "./types";


import {
  saveAppSettings as saveAppSettingsToFirebase,
  getUserStoragePath,
  addFolder as addFolderToFirebase,
} from "@/lib/firebase";
import { useUserQuery } from "@/domains/users/useUserQuery";

export const useSaveAppSettingsMutation = (
  options?: UseMutationOptions<AppSettings, unknown, AppSettings>
) => {
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (appSettings) => {
      if (!user) throw new Error("Unauthorized");
      await saveAppSettingsToFirebase(user.uid, appSettings);
      return appSettings; // void를 반환하게 되어있는데, 기존 mutation은 data를 반환했음. settings를 그대로 반환.
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
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (props) => {
      if (!user) throw new Error("Unauthorized");

      const userStoragePath = getUserStoragePath(user, props.path);
      await addFolderToFirebase(userStoragePath);
    },
    ...options,
  });
};
