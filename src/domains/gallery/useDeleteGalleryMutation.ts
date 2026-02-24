import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGallery } from "./fetchers";
import { getGalleriesQueryKey } from "./useGalleriesQuery";

export const useDeleteGalleryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (galleryId: string) => deleteGallery(galleryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGalleriesQueryKey() });
    },
  });
};

