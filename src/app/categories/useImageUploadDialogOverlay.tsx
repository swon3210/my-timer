import { useOverlay } from "@toss/use-overlay";
import ImageUploadDialog from "./ImageUploadDialog";

const useImageUploadDialogOverlay = () => {
  const overlay = useOverlay();

  const openImageUploadDialog = ({
    onImagesUploaded,
  }: {
    onImagesUploaded: (folderName: string, files: File[]) => void;
  }) => {
    return overlay.open(({ close, isOpen }) => (
      <ImageUploadDialog
        close={close}
        isOpen={isOpen}
        onImagesUploaded={onImagesUploaded}
      />
    ));
  };

  return {
    openImageUploadDialog,
  };
};

export default useImageUploadDialogOverlay;
