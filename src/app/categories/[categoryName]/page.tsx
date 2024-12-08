"use client";

import FolderItem from "@/components/FolderItem";
import LongPressCheckWrapper from "@/components/LongPressChecker";
import { Button } from "@/components/ui/button";
import useImageFolderNamesQuery from "@/domains/folders/useImageFolderNamesQuery";
import {
  categoryNameAtom,
  folderNameAtom,
  isSelectionModeAtom,
  selectedFolderNamesAtom,
} from "@/lib/atoms";
import { AnimatePresence } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const router = useRouter();

  const [, setCategoryName] = useAtom(categoryNameAtom);
  const [, setFolderName] = useAtom(folderNameAtom);
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

  const handleFolderSelectButtonClick = (folderName: string) => {
    setCategoryName(params.categoryName);
    setFolderName(folderName);

    router.push("/home");
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
                <FolderItem
                  count={0}
                  imageUrl="/folder-icon.png"
                  imageAlt="폴더 아이콘"
                  type="image-folder"
                  folderName={folderName}
                  bottomComponent={
                    <div className="w-full flex justify-center items-center gap-2 mt-2">
                      <Button
                        onClick={() =>
                          handleFolderSelectButtonClick(folderName)
                        }
                      >
                        선택
                      </Button>
                      <Link
                        key={folderName}
                        href={`/categories/${params.categoryName}/${folderName}`}
                      >
                        <Button variant="secondary">미리보기</Button>
                      </Link>
                    </div>
                  }
                />
              </LongPressCheckWrapper>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
