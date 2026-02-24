import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGalleryImages } from "./fetchers";
import { CreateGalleryImageInput } from "./types";
import { getGalleryImagesQueryKey } from "./useGalleryImagesQuery";
import { getImageFoldersQueryKey } from "./useImageFoldersQuery";

interface CreateGalleryImagesMutationInput {
  images: CreateGalleryImageInput[];
  galleryName: string;
  folderName: string;
}

export const useCreateGalleryImagesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateGalleryImagesMutationInput) =>
      createGalleryImages(input.images),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: getGalleryImagesQueryKey(
          variables.galleryName,
          variables.folderName
        ),
      });
      queryClient.invalidateQueries({
        queryKey: getImageFoldersQueryKey(variables.galleryName),
      });
    },
  });
};

