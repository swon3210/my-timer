"use client";

import FolderItem from "@/components/FolderItem";
import LongPressCheckWrapper from "@/components/LongPressChecker";
import useFolderNamesQuery from "@/domains/folders/useFolderNamesQuery";
import useImageFolderNamesQuery from "@/domains/folders/useImageFolderNamesQuery";
import { isSelectionModeAtom, selectedFolderNamesAtom } from "@/lib/atoms";
import { AnimatePresence } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";

function CategoryFolderItem({ categoryName }: { categoryName: string }) {
  const { data: imageFolderNames = [] } = useImageFolderNamesQuery({
    categoryName,
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

  const { data: categoryNames = [] } = useFolderNamesQuery();

  const [selectedFolderNames, setSelectedFolderNames] = useAtom(
    selectedFolderNamesAtom
  );

  const handleCheckedChange = (folderName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedFolderNames([...selectedFolderNames, folderName]);
    } else {
      setSelectedFolderNames(
        selectedFolderNames.filter((name) => name !== folderName)
      );
    }
  };

  const handleLongPress = (folderName: string) => {
    if (isSelectionMode) {
      setSelectedFolderNames([...selectedFolderNames, folderName]);
    }
  };

  return (
    <div className="w-full h-full mx-auto p-4">
      <div className="w-full h-full max-w-app-container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {categoryNames.map((folderName) => (
              <LongPressCheckWrapper
                key={folderName}
                handleLongPress={() => handleLongPress(folderName)}
                isSelectionMode={isSelectionMode}
                checked={selectedFolderNames.includes(folderName)}
                onCheckedChange={(isChecked) =>
                  handleCheckedChange(folderName, isChecked)
                }
              >
                <Link
                  key={folderName}
                  href={isSelectionMode ? "" : `/categories/${folderName}`}
                >
                  <CategoryFolderItem categoryName={folderName} />
                </Link>
              </LongPressCheckWrapper>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
