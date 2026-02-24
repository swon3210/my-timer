import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { AppSettings } from "./types";

import { saveAppSettings as saveAppSettingsToFirebase } from "@/lib/firebase";
import { useUserQuery } from "@/domains/users/useUserQuery";
import { createGallery } from "@/domains/gallery/fetchers";
import { getFolderNamesQueryKey } from "@/domains/folders/useFolderNamesQuery";

export const useSaveAppSettingsMutation = (
  options?: UseMutationOptions<AppSettings, unknown, AppSettings>
) => {
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (appSettings) => {
      if (!user) throw new Error("Unauthorized");
      await saveAppSettingsToFirebase(user.uid, appSettings);
      return appSettings;
    },
    ...options,
  });
};

type AddFolderMutationProps = {
  path: string;
};

/**
 * 갤러리(카테고리) 폴더를 생성합니다.
 * Firestore에 갤러리 문서를 생성합니다.
 */
export const useAddFolderMutation = (
  options?: UseMutationOptions<unknown, unknown, AddFolderMutationProps>
) => {
  const { data: user } = useUserQuery();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props) => {
      if (!user) throw new Error("Unauthorized");

      // path에서 폴더 이름 추출 (예: "images/여행" → "여행")
      const folderName = props.path.split("/").pop() ?? props.path;
      
      await createGallery({ name: folderName });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFolderNamesQueryKey() });
    },
    ...options,
  });
};
