import { useOverlay } from "@toss/use-overlay";
import ImageUploadDialog, { ImageGroup } from "./ImageUploadDialog";

const useImageUploadDialogOverlay = () => {
  const overlay = useOverlay();

  const openImageUploadDialog = ({
    onImagesUploaded,
  }: {
    onImagesUploaded: (imageGroups: ImageGroup[]) => void;
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
