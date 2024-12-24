import useImagesQuery from "@/domains/images/useImagesQuery";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
// import { isLocalEnv } from "@/lib/utils";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ImageShuffleButton from "./ImageShuffleButton";

const prefetchImage = (imageUrl: string) => {
  new Image().src = imageUrl;
};

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
  const categoryName = useAtomValue(categoryNameAtom);
  const folderName = useAtomValue(folderNameAtom);
  const nextImageUrlIndexRef = useRef<number>();
  const [imageUrlIndex, setImageUrlIndex] = useState(0);

  const { data: imageUrls = [] } = useImagesQuery({
    categoryName,
    folderName,
  });

  const selectedImageUrl = imageUrls[imageUrlIndex] as string | undefined;

  const handleBackgroundGalleryClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // 클릭한 좌표 획득
    const { clientX } = event;

    if (clientX < window.innerWidth / 2) {
      setImageUrlIndex(
        (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
      );
    } else {
      setImageUrlIndex((prev) => (prev + 1) % imageUrls.length);
    }
  };

  const handleImageShuffleButtonClick = () => {
    setImageUrlIndex(getRandomIndex(imageUrls.length));
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
    prefetchImage(imageUrls[nextImageUrlIndexRef.current]);
  }, [imageUrls]);

  useImperativeHandle(ref, () => ({
    changeImage: chageImage,
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setImageUrlIndex(
          (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
        );
      } else if (e.key === "ArrowRight") {
        setImageUrlIndex((prev) => (prev + 1) % imageUrls.length);
      } else if (e.key === "ArrowUp") {
        setImageUrlIndex(getRandomIndex(imageUrls.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageUrls]);

  useEffect(() => {
    setImageUrlIndex(getRandomIndex(imageUrls.length));
  }, [imageUrls]);

  useEffect(() => {
    const prevIndex = (imageUrlIndex - 1 + imageUrls.length) % imageUrls.length;
    const nextIndex = (imageUrlIndex + 1) % imageUrls.length;

    prefetchImage(imageUrls[prevIndex]);
    prefetchImage(imageUrls[nextIndex]);
  }, [imageUrlIndex, imageUrls]);

  return (
    <>
      {selectedImageUrl && (
        <div
          className={clsx("w-full h-full", className)}
          style={{
            backgroundImage: `url('${selectedImageUrl.replaceAll(
              "'",
              "\\'"
            )}')`,
            // backgroundImage: isLocalEnv()
            //   ? ""
            //   : `url('${selectedImageUrl.replaceAll("'", "\\'")}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onClick={handleBackgroundGalleryClick}
        />
      )}
      <ImageShuffleButton
        onClick={handleImageShuffleButtonClick}
        className="absolute bottom-4 right-4"
      />
    </>
  );
});

BackgroundGallery.displayName = "BackgroundGallery";

export default BackgroundGallery;
