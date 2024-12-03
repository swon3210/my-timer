"use client";

import { useCategoryNamesQuery } from "@/domains/images/useImageFolderNamesQuery";
import { motion, AnimatePresence } from "framer-motion";
import { FolderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
  const { data: categoryNames = [] } = useCategoryNamesQuery();

  return (
    <div className="w-full h-full mx-auto px-4 py-12">
      <div className="w-full h-full max-w-app-container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:pt-16">
          <AnimatePresence>
            {categoryNames.map((folderName) => (
              <Link key={folderName} href={`/categories/${folderName}`}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group flex flex-col justify-center items-center h-48"
                >
                  <Image
                    src="/folders-icon.png"
                    alt="폴더 목록 아이콘"
                    className="object-cover transition-transform duration-300 group-hover:scale-110 mb-2"
                    width={24}
                    height={24}
                  />
                  <h2 className="font-semibold text-lg mb-1">{folderName}</h2>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <FolderIcon className="w-4 h-4 mr-1" />
                    {0}개의 폴더
                  </p>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
