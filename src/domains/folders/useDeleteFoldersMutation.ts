import { useMutation } from "@tanstack/react-query";
import { deleteFolders } from "./fetchers";

const useDeleteFoldersMutation = () => {
  return useMutation({
    mutationFn: deleteFolders,
  });
};

export default useDeleteFoldersMutation;
