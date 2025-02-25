"use client";

import LongPressCheckWrapper from "@/components/LongPressChecker";
import useImageFolderNamesQuery from "@/domains/folders/useImageFolderNamesQuery";
import { isSelectionModeAtom, selectedFolderNamesAtom } from "@/lib/atoms";
import { AnimatePresence } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import ImageFolderItem from "../components/ImageFolderItem";

export default function CategoriesPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const isSelectionMode = useAtomValue(isSelectionModeAtom);

  const { data: folderNames } = useImageFolderNamesQuery({
    categoryName: params.categoryName,
  });

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
            {folderNames.map((folderName) => (
              <LongPressCheckWrapper
                key={folderName}
                handleLongPress={() => handleLongPress(folderName)}
                isSelectionMode={isSelectionMode}
                checked={selectedFolderNames.includes(folderName)}
                onCheckedChange={(isChecked) =>
                  handleCheckedChange(folderName, isChecked)
                }
              >
                <div id={folderName} className="scroll-mt-20">
                  <ImageFolderItem
                    categoryName={params.categoryName}
                    folderName={folderName}
                  />
                </div>
              </LongPressCheckWrapper>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
