"use client";

import FolderItem from "@/components/FolderItem";
import LongPressCheckWrapper from "@/components/LongPressChecker";
import { isSelectionModeAtom, selectedFolderNamesAtom } from "@/lib/atoms";
import { AnimatePresence } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useGalleriesQuery } from "@/domains/gallery";
import useImageFolderNamesQuery from "@/domains/folders/useImageFolderNamesQuery";

function CategoryFolderItem({ categoryId, categoryName }: { categoryId: string; categoryName: string }) {
  const { data: imageFolderNames = [] } = useImageFolderNamesQuery({
    categoryId,
  });

  return (
    <FolderItem
      type="folder"
      folderName={categoryName}
      count={imageFolderNames.length}
    />
  );
}

export default function CategoriesPage() {
  const isSelectionMode = useAtomValue(isSelectionModeAtom);

  const { data: galleries = [] } = useGalleriesQuery();

  const [selectedFolderNames, setSelectedFolderNames] = useAtom(
    selectedFolderNamesAtom
  );

  const handleCheckedChange = (galleryId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedFolderNames([...selectedFolderNames, galleryId]);
    } else {
      setSelectedFolderNames(
        selectedFolderNames.filter((id) => id !== galleryId)
      );
    }
  };

  const handleLongPress = (galleryId: string) => {
    if (isSelectionMode) {
      setSelectedFolderNames([...selectedFolderNames, galleryId]);
    }
  };

  return (
    <div className="w-full h-full mx-auto p-4">
      <div className="w-full h-full max-w-app-container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {galleries.map((gallery) => (
              <LongPressCheckWrapper
                key={gallery.id}
                handleLongPress={() => handleLongPress(gallery.id)}
                isSelectionMode={isSelectionMode}
                checked={selectedFolderNames.includes(gallery.id)}
                onCheckedChange={(isChecked) =>
                  handleCheckedChange(gallery.id, isChecked)
                }
              >
                <Link
                  key={gallery.id}
                  href={isSelectionMode ? "" : `/categories/${gallery.id}`}
                >
                  <CategoryFolderItem categoryId={gallery.id} categoryName={gallery.name} />
                </Link>
              </LongPressCheckWrapper>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
