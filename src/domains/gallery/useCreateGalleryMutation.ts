import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGallery } from "./fetchers";
import { CreateGalleryInput } from "./types";
import { getGalleriesQueryKey } from "./useGalleriesQuery";

export const useCreateGalleryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateGalleryInput) => createGallery(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGalleriesQueryKey() });
    },
  });
};

