"use client";

import BackgroundGallery from "@/components/BackgroundGallery";
import Timer from "@/components/Timer";
import useImagesQuery from "@/domains/images/useImagesQuery";
import { useSettingsQuery } from "@/domains/users/useSettingsQuery";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
import usePlatform from "@/lib/hooks";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";

// 이미지 url 을 받아 해당 이미지를 prefetch 하는 함수
const prefetchImage = (imageUrl: string) => {
  new Image().src = imageUrl;
};

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

const DEFAULT_TICK_SECONDS = 5;

export default function Home() {
  const categoryName = useAtomValue(categoryNameAtom);
  const folderName = useAtomValue(folderNameAtom);
  const { platform } = usePlatform();

  const { data: appSettings } = useSettingsQuery();

  const { data: imageUrls = [] } = useImagesQuery({ categoryName, folderName });

  const [imageUrlIndex, setImageUrlIndex] = useState(0);
  const nextImageUrlIndexRef = useRef<number>();

  const selectedImageUrl = imageUrls[imageUrlIndex] as string | undefined;

  const handleStandardSecondsReached = useCallback(() => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setImageUrlIndex(
          (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
        );
      } else if (e.key === "ArrowRight") {
        setImageUrlIndex((prev) => (prev + 1) % imageUrls.length);
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

  if (platform == null || appSettings == null) {
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      {selectedImageUrl && (
        <BackgroundGallery
          selectedImageUrl={selectedImageUrl}
          onClick={handleBackgroundGalleryClick}
          className={clsx("fixed top-0 left-0 z-0")}
        />
      )}
      {appSettings.shouldExposeTimer && (
        <Timer
          standardSeconds={appSettings?.tickSeconds ?? DEFAULT_TICK_SECONDS}
          onStandardSecondsReached={handleStandardSecondsReached}
          className="relative z-10"
        />
      )}
    </div>
  );
}
