import useImagesQuery from "@/domains/images/useImagesQuery";
import {
  bookMarksAtom,
  categoryNameAtom,
  folderNameAtom,
  imageUrlIndexAtom,
} from "@/lib/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import ImageShuffleButton from "./ImageShuffleButton";
import { cn } from "@/lib/utils";
import FolderSwitchButtons from "./FolderSwitchButtons";
import ImageIndexIndicator from "./ImageIndexIndicator";
import NavigateToFolderButton from "./NavigateToFolderButton";
import NavigateToCategoryButton from "./NavigateToCategoryButton";
import useImageFolderNamesQuery from "@/domains/folders/useImageFolderNamesQuery";
import FullPageCarousel from "./FullPageCarousel";
import Z_INDEX from "@/app/_constants/z-index";

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

type BackgroundGalleryProps = {
  className?: string;
};

export type BackgroundGalleryHandle = {
  changeImage?: () => void;
};

const BackgroundGallery = forwardRef<
  BackgroundGalleryHandle,
  BackgroundGalleryProps
>(({ className }, ref) => {
  const categoryId = useAtomValue(categoryNameAtom);
  const [folderName, setFolderName] = useAtom(folderNameAtom);

  const { data: imageFolderNames = [] } = useImageFolderNamesQuery({
    categoryId,
  });

  const nextImageUrlIndexRef = useRef<number>();

  const [imageUrlIndex, setImageUrlIndex] = useAtom(imageUrlIndexAtom);

  const setBookMarks = useSetAtom(bookMarksAtom);

  const { data: imageUrls = [] } = useImagesQuery({
    categoryId: categoryId ?? null,
    folderName: decodeURIComponent(folderName ?? ""),
  });

  const setPrevImageUrlIndex = useCallback(() => {
    const currentFolderIndex = imageFolderNames.findIndex(
      (imageFolderName) => imageFolderName === folderName
    );

    const targetFolderIndex =
      currentFolderIndex === 0
        ? imageFolderNames.length - 1
        : currentFolderIndex - 1;

    const targetFolderName = imageFolderNames[targetFolderIndex];

    if (
      imageUrlIndex === 0 &&
      confirm(`${targetFolderName} 폴더로 이동하시겠습니까? `)
    ) {
      setFolderName(targetFolderName);
      setImageUrlIndex(0);

      return;
    }

    setImageUrlIndex((imageUrlIndex - 1 + imageUrls.length) % imageUrls.length);
  }, [
    folderName,
    imageFolderNames,
    imageUrlIndex,
    imageUrls.length,
    setFolderName,
    setImageUrlIndex,
  ]);

  const setNextImageUrlIndex = useCallback(() => {
    const currentFolderIndex = imageFolderNames.findIndex(
      (imageFolderName) => imageFolderName === folderName
    );

    const targetFolderIndex =
      currentFolderIndex === imageFolderNames.length - 1
        ? 0
        : currentFolderIndex + 1;

    const targetFolderName = imageFolderNames[targetFolderIndex];

    if (
      imageUrlIndex === imageUrls.length - 1 &&
      confirm(`${targetFolderName} 폴더로 이동하시겠습니까? `)
    ) {
      setFolderName(targetFolderName);
      setImageUrlIndex(0);

      return;
    }

    return setImageUrlIndex((imageUrlIndex + 1) % imageUrls.length);
  }, [
    folderName,
    imageFolderNames,
    imageUrlIndex,
    imageUrls.length,
    setFolderName,
    setImageUrlIndex,
  ]);

  const handleBackgroundGalleryClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // 클릭한 좌표 획득
    const { clientX } = event;

    if (clientX < window.innerWidth / 2) {
      setPrevImageUrlIndex();
    } else {
      setNextImageUrlIndex();
    }
  };

  const handleImageShuffleButtonClick = () => {
    setImageUrlIndex(getRandomIndex(imageUrls.length));
  };

  const handleFolderSwitch = () => {
    setImageUrlIndex(0);
  };

  const chageImage = useCallback(() => {
    if (imageUrls.length === 0) {
      return;
    }

    if (nextImageUrlIndexRef.current == null) {
      setImageUrlIndex(getRandomIndex(imageUrls.length));
    } else {
      setImageUrlIndex(nextImageUrlIndexRef.current);
    }

    nextImageUrlIndexRef.current = getRandomIndex(imageUrls.length);
  }, [imageUrls, setImageUrlIndex]);

  useImperativeHandle(ref, () => ({
    changeImage: chageImage,
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPrevImageUrlIndex();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setNextImageUrlIndex();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setImageUrlIndex(getRandomIndex(imageUrls.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageUrls.length, setPrevImageUrlIndex, setNextImageUrlIndex]);

  useEffect(() => {
    if (categoryId == null || folderName == null) {
      return;
    }

    setBookMarks((prev) => {
      const newBookMarks = [...prev];

      const targetBookMark = newBookMarks.find(
        (bookMark) =>
          bookMark.categoryName === categoryId &&
          bookMark.folderName === folderName
      );

      if (targetBookMark) {
        targetBookMark.imageUrlIndex = imageUrlIndex;
      } else {
        newBookMarks.push({
          categoryName: categoryId,
          folderName,
          imageUrlIndex,
        });
      }

      return newBookMarks;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrlIndex]);

  return (
    <div
      className={cn(
        "relative w-full h-full",
        Z_INDEX.BACKGROUND_GALLERY,
        className
      )}
    >
      {imageUrls.length > 0 && (
        <FullPageCarousel
          imageIndex={imageUrlIndex}
          imageUrls={imageUrls}
          onImageClick={handleBackgroundGalleryClick}
          onImageSlide={setImageUrlIndex}
        />
      )}
      {imageUrls.length > 0 && (
        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <NavigateToCategoryButton />
            <NavigateToFolderButton />
          </div>
          <ImageIndexIndicator
            currentIndex={imageUrlIndex}
            totalImages={imageUrls.length}
          />
        </div>
      )}
      <ImageShuffleButton
        onClick={handleImageShuffleButtonClick}
        className="absolute bottom-2 right-2 z-10"
      />
      <FolderSwitchButtons
        className="absolute bottom-2 right-14 z-10"
        onFolderSwitch={handleFolderSwitch}
      />
    </div>
  );
});

BackgroundGallery.displayName = "BackgroundGallery";

export default BackgroundGallery;
