"use client";

import BackgroundGallery from "@/components/BackgroundGallery";
import Timer from "@/components/Timer";
import { loadImages } from "@/firebase";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageUrlIndex, setImageUrlIndex] = useState(0);

  const selectedImageUrl = imageUrls[imageUrlIndex];

  const handleStandardSecondsReached = useCallback(() => {
    if (imageUrls.length === 0) {
      return;
    }

    setImageUrlIndex(Math.floor(Math.random() * imageUrls.length));
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    loadImages().then((imageUrls) => {
      if (imageUrls) {
        setImageUrls(imageUrls);
      }
    });
  }, []);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <BackgroundGallery selectedImageUrl={selectedImageUrl} />
      <Timer
        standardSeconds={5}
        onStandardSecondsReached={handleStandardSecondsReached}
      />
    </main>
  );
}
