import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageFolder } from "./fetchers";
import { getImageFoldersQueryKey } from "./useImageFoldersQuery";
import { getGalleriesQueryKey } from "./useGalleriesQuery";

interface DeleteImageFolderInput {
  folderId: string;
  galleryName: string;
}

export const useDeleteImageFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DeleteImageFolderInput) =>
      deleteImageFolder(input.folderId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: getImageFoldersQueryKey(variables.galleryName),
      });
      queryClient.invalidateQueries({ queryKey: getGalleriesQueryKey() });
    },
  });
};

