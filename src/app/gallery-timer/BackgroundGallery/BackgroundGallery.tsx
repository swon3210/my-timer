import useImagesQuery from "@/domains/images/useImagesQuery";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
// import { isLocalEnv } from "@/lib/utils";
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
import { cn } from "@/lib/utils";
import FolderSwitchButtons from "./FolderSwitchButtons";
import ImageIndexIndicator from "./ImageIndexIndicator";
import NavigateToFolderButton from "./NavigateToFolderButton";
import NavigateToCategoryButton from "./NavigateToCategoryButton";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const categoryName = useAtomValue(categoryNameAtom);
  const folderName = useAtomValue(folderNameAtom);
  const nextImageUrlIndexRef = useRef<number>();

  const [imageUrlIndex, setImageUrlIndex] = useState(() => {
    const imageUrlIndexParams = searchParams.get("image-url-index");
    return imageUrlIndexParams ? parseInt(imageUrlIndexParams) : 0;
  });

  const { data: imageUrls = [] } = useImagesQuery({
    categoryName,
    folderName,
  });

  const selectedImageUrl = imageUrls[imageUrlIndex] as string | undefined;

  const backgroundImage = selectedImageUrl
    ? `url('${selectedImageUrl?.replaceAll("'", "\\'")}')`
    : undefined;

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
    const prevIndex = (imageUrlIndex - 1 + imageUrls.length) % imageUrls.length;
    const nextIndex = (imageUrlIndex + 1) % imageUrls.length;

    prefetchImage(imageUrls[prevIndex]);
    prefetchImage(imageUrls[nextIndex]);
  }, [imageUrlIndex, imageUrls]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* <div>
        <FullPageCarousel />
      </div> */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(20px)", // 블러 효과 추가
          transform: "scale(1.1)", // 블러 경계 처리
        }}
      />
      <div
        className="absolute top-0 left-0 z-10 w-full h-full"
        style={{
          backgroundImage,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onClick={handleBackgroundGalleryClick}
      />
      <ImageShuffleButton
        onClick={handleImageShuffleButtonClick}
        className="absolute bottom-4 right-4 z-20"
      />
      <FolderSwitchButtons
        className="absolute bottom-4 right-16 z-20"
        onFolderSwitch={handleFolderSwitch}
      />

      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <NavigateToCategoryButton />
          <NavigateToFolderButton />
        </div>
        {imageUrls.length > 0 && (
          <ImageIndexIndicator
            currentIndex={imageUrlIndex}
            totalImages={imageUrls.length}
          />
        )}
      </div>
    </div>
  );
});

BackgroundGallery.displayName = "BackgroundGallery";

export default BackgroundGallery;
