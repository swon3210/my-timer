/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { gridLayoutColumnNumberAtom } from "@/lib/atoms";
import { useImagesQuery } from "@/lib/queries";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";

const gridOptions = [
  { value: 1, label: "1x1" },
  { value: 2, label: "2x2" },
  { value: 3, label: "3x3" },
  { value: 4, label: "4x4" },
];

export default function CategoriesPage({
  params,
}: {
  params: { categoryName: string; imageFolderName: string };
}) {
  const [gridLayoutColumnNumber, setGridLayoutColumnNumber] = useAtom(
    gridLayoutColumnNumberAtom
  );

  const { data: imageUrls = [] } = useImagesQuery({
    categoryName: params.categoryName,
    folderName: params.imageFolderName,
  });

  const handleGridLayoutColumnNumberButtonClick = (value: number) => {
    setGridLayoutColumnNumber(value);
  };
  return (
    <div className="w-full h-full mx-auto px-4 py-12">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
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
      <div className="w-full h-full max-w-app-container mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 auto-rows-[minmax(100px,_auto)]"
          style={{
            gridTemplateColumns: gridLayoutColumnNumber
              ? `repeat(${gridLayoutColumnNumber}, minmax(0, 1fr))`
              : undefined,
          }}
        >
          <AnimatePresence>
            {imageUrls.map((imageUrl) => (
              <button key={imageUrl} type="button">
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
