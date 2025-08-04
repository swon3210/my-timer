import { overlay } from "overlay-kit";
import ImageUploadDialog, {
  ImageGroup,
  ImageUploadDialogRef,
} from "./components/ImageUploadDialog/ImageUploadDialog";
import { RefObject } from "react";

const useImageUploadDialogOverlay = () => {
  const openImageUploadDialog = ({
    ref,
    onImagesUploaded,
  }: {
    ref: RefObject<ImageUploadDialogRef>;
    onImagesUploaded: (imageGroups: ImageGroup[]) => void;
  }) => {
    return overlay.open(({ close, isOpen }) => (
      <ImageUploadDialog
        ref={ref}
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
