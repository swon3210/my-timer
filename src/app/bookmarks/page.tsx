/* eslint-disable @next/next/no-img-element */
"use client";

import useImagesQuery from "@/domains/images/useImagesQuery";
import {
  BookMark,
  bookMarksAtom,
  categoryNameAtom,
  folderNameAtom,
  imageUrlIndexAtom,
} from "@/lib/atoms";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

const BookMarkItem = ({ bookMark }: { bookMark: BookMark }) => {
  const router = useRouter();
  const setCategoryName = useSetAtom(categoryNameAtom);
  const setFolderName = useSetAtom(folderNameAtom);
  const setImageUrlIndex = useSetAtom(imageUrlIndexAtom);

  const { data: imageUrls = [] } = useImagesQuery({
    categoryName: decodeURIComponent(bookMark.categoryName ?? ""),
    folderName: decodeURIComponent(bookMark.folderName ?? ""),
  });

  const handleClick = () => {
    setCategoryName(bookMark.categoryName);
    setFolderName(bookMark.folderName);
    setImageUrlIndex(bookMark.imageUrlIndex);
    router.push("/gallery-timer");
  };

  return (
    <button type="button" onClick={handleClick}>
      <motion.div
        key={imageUrls[bookMark.imageUrlIndex]}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-lg shadow-sm flex flex-col justify-center items-center"
      >
        <img
          src={imageUrls[bookMark.imageUrlIndex]}
          alt="이미지 미리보기"
          className="object-cover"
          loading="lazy"
        />
      </motion.div>
    </button>
  );
};

export default function BookmarksPage() {
  const [bookMarks] = useAtom(bookMarksAtom);

  return (
    <div className="w-full h-full mx-auto p-4">
      <div className="w-full h-full max-w-app-container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 auto-rows-[minmax(100px,_auto)]">
          <AnimatePresence>
            {bookMarks.map((bookMark) => (
              <BookMarkItem
                key={bookMark.categoryName + bookMark.folderName}
                bookMark={bookMark}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
