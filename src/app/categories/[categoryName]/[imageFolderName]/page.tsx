/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import useImagesQuery from "@/domains/images/useImagesQuery";
import {
  categoryNameAtom,
  folderNameAtom,
  gridLayoutColumnNumberAtom,
  imageUrlIndexAtom,
} from "@/lib/atoms";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import Intersection from "@/app/_components/Intersection";
import { useState } from "react";

const gridOptions = [
  { value: 1, label: "1x1" },
  { value: 2, label: "2x2" },
  { value: 3, label: "3x3" },
  { value: 4, label: "4x4" },
];

export default function ImageFolderPage({
  params,
}: {
  params: { categoryName: string; imageFolderName: string };
}) {
  const [imageSliceIndex, setImageSliceIndex] = useState(1);

  const [, setCategoryName] = useAtom(categoryNameAtom);
  const [, setFolderName] = useAtom(folderNameAtom);
  const [, setImageUrlIndex] = useAtom(imageUrlIndexAtom);

  const router = useRouter();

  const [gridLayoutColumnNumber, setGridLayoutColumnNumber] = useAtom(
    gridLayoutColumnNumberAtom
  );

  // TODO : decodeURIComponent 제거
  const { data: imageUrls = [] } = useImagesQuery({
    categoryName: decodeURIComponent(params.categoryName),
    folderName: decodeURIComponent(params.imageFolderName),
  });

  const slicedImageUrls = imageUrls.slice(0, imageSliceIndex * 10);

  const handleGridLayoutColumnNumberButtonClick = (value: number) => {
    setGridLayoutColumnNumber(value);
  };

  const handleImageClick = (index: number) => {
    setCategoryName(params.categoryName);
    setFolderName(params.imageFolderName);
    setImageUrlIndex(index);
    router.push(`/gallery-timer`);
  };

  return (
    <div className="w-full h-full mx-auto p-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {gridOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() =>
                handleGridLayoutColumnNumberButtonClick(option.value)
              }
              variant={
                gridLayoutColumnNumber === option.value ? "default" : "outline"
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full h-full max-w-app-container mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 auto-rows-[minmax(100px,_auto)]"
          style={{
            gridTemplateColumns: gridLayoutColumnNumber
              ? `repeat(${gridLayoutColumnNumber}, minmax(0, 1fr))`
              : undefined,
          }}
        >
          <AnimatePresence>
            {slicedImageUrls.map((imageUrl, index) => (
              <button
                key={imageUrl}
                type="button"
                onClick={() => handleImageClick(index)}
                id={index.toString()}
                className="scroll-mt-20"
              >
                <motion.div
                  key={imageUrl}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg shadow-sm flex flex-col justify-center items-center"
                >
                  <img
                    src={imageUrl}
                    alt="이미지 미리보기"
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </button>
            ))}
            {slicedImageUrls.length > 0 && (
              <Intersection
                onIntersect={() => {
                  setImageSliceIndex(imageSliceIndex + 1);
                }}
                className="h-10"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
