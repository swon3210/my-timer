import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createImageFolder } from "./fetchers";
import { CreateImageFolderInput } from "./types";
import { getImageFoldersQueryKey } from "./useImageFoldersQuery";
import { getGalleriesQueryKey } from "./useGalleriesQuery";

export const useCreateImageFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateImageFolderInput) => createImageFolder(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: getImageFoldersQueryKey(variables.galleryName),
      });
      queryClient.invalidateQueries({ queryKey: getGalleriesQueryKey() });
    },
  });
};

