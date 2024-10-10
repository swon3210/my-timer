"use client";

import BackgroundGallery from "@/components/BackgroundGallery";
import Timer from "@/components/Timer";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
import { useImagesQuery } from "@/lib/queries";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";

// 이미지 url 을 받아 해당 이미지를 prefetch 하는 함수
const prefetchImage = (imageUrl: string) => {
  new Image().src = imageUrl;
};

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

export default function Home() {
  const categoryName = useAtomValue(categoryNameAtom);
  const folderName = useAtomValue(folderNameAtom);

  const { data: imageUrls = [] } = useImagesQuery({ categoryName, folderName });

  const [imageUrlIndex, setImageUrlIndex] = useState(0);
  const nextImageUrlIndexRef = useRef<number>();

  const selectedImageUrl = imageUrls[imageUrlIndex];

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

    const handleSwipe = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const screenWidth = window.innerWidth;
      const threshold = 100;

      if (x < threshold) {
        setImageUrlIndex(
          (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
        );
      } else if (x > screenWidth - threshold) {
        setImageUrlIndex((prev) => (prev + 1) % imageUrls.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleSwipe);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleSwipe);
    };
  });

  useEffect(() => {
    const prevIndex = (imageUrlIndex - 1 + imageUrls.length) % imageUrls.length;
    const nextIndex = (imageUrlIndex + 1) % imageUrls.length;

    prefetchImage(imageUrls[prevIndex]);
    prefetchImage(imageUrls[nextIndex]);
  }, [imageUrlIndex, imageUrls]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <BackgroundGallery selectedImageUrl={selectedImageUrl} />
      <Timer
        standardSeconds={5}
        onStandardSecondsReached={handleStandardSecondsReached}
      />
    </div>
  );
}
