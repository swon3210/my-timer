"use client";

import { useAtom, useAtomValue } from "jotai";
import { Check, FolderPlus, Trash, Upload, X } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import useDeleteFoldersMutation from "@/domains/folders/useDeleteFoldersMutation";
import useFolderNamesQuery, {
  getFolderNamesQueryKey,
} from "@/domains/folders/useFolderNamesQuery";
import useImageFolderNamesQuery, {
  getImageFolderNamesQueryKey,
} from "@/domains/folders/useImageFolderNamesQuery";
import { getImagesQueryKey } from "@/domains/images/useImagesQuery";
import { useUserQuery } from "@/domains/users/useUserQuery";
import {
  isSelectionModeAtom,
  selectedFolderNamesAtom,
  selectedImagesAtom,
} from "@/lib/atoms";
import { useAddFolderMutation } from "@/lib/mutations";
import { useInvalidateQuery } from "@/lib/queries";
import { useFirebase } from "@/app/providers/FirebaseProvider";

import { getUserStoragePath } from "../api/firebase";

import useImageUploadDialogOverlay from "./useImageUploadDialogOverlay";
import { ImageGroup, useSetImagesUploadProgress } from "./ImageUploadDialog";

const AddFolderButton = () => {
  const { data: folderNames } = useFolderNamesQuery();
  const { mutateAsync: addFolder } = useAddFolderMutation();
  const invalidateQuery = useInvalidateQuery();

  const handleClick = async () => {
    const folderName = prompt("폴더 이름을 입력하세요.");

    if (!folderName) {
      return;
    }

    const hasFolderName = folderNames.includes(folderName.trim());

    if (hasFolderName) {
      alert("이미 존재하는 폴더입니다.");
      return;
    }

    await addFolder({ path: `images/${folderName}` });

    toast(`${folderName} 폴더를 업로드하였습니다.`);

    void invalidateQuery(getFolderNamesQueryKey());
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className="size-10"
    >
      <FolderPlus />
    </Button>
  );
};

const AddImageFolderButton = ({ categoryName }: { categoryName: string }) => {
  const { data: imageFolderNames } = useImageFolderNamesQuery({ categoryName });
  const { data: user } = useUserQuery();

  const { addImages } = useFirebase();
  const invalidateQuery = useInvalidateQuery();

  const { openImageUploadDialog } = useImageUploadDialogOverlay();

  const setImagesUploadProgress = useSetImagesUploadProgress();

  const handleImagesUploaded = async (imageGroups: ImageGroup[]) => {
    if (imageGroups.length === 0 || !user) {
      return;
    }

    const imageGroupFolderNames = imageGroups.map(
      (imageGroup) => imageGroup.folderName
    );

    const hasFolderNames = imageGroupFolderNames.filter(
      (imageGroupFolderName) => {
        return imageFolderNames.includes(imageGroupFolderName.trim());
      }
    );

    if (hasFolderNames.length > 0) {
      alert(
        `${hasFolderNames.join(
          ", "
        )} 폴더 명이 이미 존재합니다. 다른 이름을 입력해주세요.`
      );
      return;
    }

    const folderNameInputs = imageGroups.map((imageGroup, index) =>
      prompt(
        imageGroups.length === 1
          ? "이미지 폴더 이름을 입력하세요."
          : `${index + 1}번째 폴더 이름을 입력하세요.`,
        imageGroup.folderName
      )
    );

    setImagesUploadProgress(0);

    let uploadedImagesFolderCount = 0;

    await Promise.all(
      imageGroups.map((imageGroup, index) =>
        addImages(
          getUserStoragePath(
            user,
            `images/${categoryName}/${folderNameInputs[index]?.trim()}`
          ),
          imageGroup.files
        ).then(() => {
          uploadedImagesFolderCount += 1;
          setImagesUploadProgress(
            (uploadedImagesFolderCount / imageGroups.length) * 100
          );
        })
      )
    );

    toast(
      imageGroups.length === 1
        ? `${imageGroups[0].folderName} 폴더에 ${imageGroups[0].files.length}개의 이미지를 업로드하였습니다.`
        : `${imageGroups.length}개의 폴더에 ${imageGroups.reduce(
            (acc, imageGroup) => acc + imageGroup.files.length,
            0
          )}개의 이미지를 업로드하였습니다.`
    );

    void invalidateQuery(getImageFolderNamesQueryKey(categoryName));

    setTimeout(() => {
      setImagesUploadProgress(undefined);
    }, 1000);
  };

  return (
    <Button
      variant="outline"
      onClick={() =>
        openImageUploadDialog({ onImagesUploaded: handleImagesUploaded })
      }
      className="size-10"
    >
      <Upload />
    </Button>
  );
};

const AddImagesToFolderButton = ({
  categoryName,
  imageFolderName,
}: {
  categoryName: string;
  imageFolderName: string;
}) => {
  const invalidateQuery = useInvalidateQuery();
  const { addImages } = useFirebase();
  const { data: user } = useUserQuery();

  const { openImageUploadDialog } = useImageUploadDialogOverlay();
  const setImagesUploadProgress = useSetImagesUploadProgress();
  const handleImagesUploaded = async (imageGroups: ImageGroup[]) => {
    if (!user) {
      return;
    }

    setImagesUploadProgress(0);

    await addImages(
      getUserStoragePath(
        user,
        `images/${categoryName}/${imageFolderName.trim()}`
      ),
      imageGroups.flatMap((imageGroup) => imageGroup.files)
    );

    setImagesUploadProgress(100);

    toast(
      `${imageGroups.reduce(
        (acc, imageGroup) => acc + imageGroup.files.length,
        0
      )}개의 이미지를 업로드하였습니다.`
    );

    setTimeout(() => {
      setImagesUploadProgress(undefined);
    }, 1000);

    void invalidateQuery(getImagesQueryKey(categoryName, imageFolderName));
  };

  return (
    <Button
      variant="outline"
      onClick={() =>
        openImageUploadDialog({ onImagesUploaded: handleImagesUploaded })
      }
      className="size-10"
    >
      <Upload />
    </Button>
  );
};

type SelectionModeButtonProps = {
  target: "images" | "folders";
};

const TrashCanButton = ({ target }: SelectionModeButtonProps) => {
  const [, setIsSelectionMode] = useAtom(isSelectionModeAtom);
  const { data: user } = useUserQuery();
  const { categoryName } = useParams() as {
    categoryName?: string;
  };

  const [, setSelectedImages] = useAtom(selectedImagesAtom);
  const [selectedFolderNames, setSelectedFolderNames] = useAtom(
    selectedFolderNamesAtom
  );
  const { mutateAsync: deleteFolders } = useDeleteFoldersMutation();
  const invalidateQuery = useInvalidateQuery();

  const hasSelectedFolder = selectedFolderNames.length > 0;

  const handleXButtonClick = async () => {
    if (!user) {
      return;
    }

    if (target === "images") {
      setSelectedImages([]);
      return;
    }

    if (
      !hasSelectedFolder ||
      !confirm(`${selectedFolderNames.length}개의 폴더를 삭제하시겠습니까?`)
    ) {
      return;
    }

    setSelectedFolderNames([]);
    await deleteFolders({
      paths: selectedFolderNames.map((name) =>
        getUserStoragePath(
          user,
          categoryName ? `images/${categoryName}/${name}` : `images/${name}`
        )
      ),
    });

    toast(`${selectedFolderNames.length}개의 폴더가 삭제되었습니다.`);

    void invalidateQuery(getFolderNamesQueryKey());

    if (categoryName) {
      void invalidateQuery(getImageFolderNamesQueryKey(categoryName));
    }

    setIsSelectionMode(false);
  };

  return (
    <Button
      variant={hasSelectedFolder ? "destructive" : "outline"}
      size="icon"
      className="w-auto h-10 px-2"
      onClick={handleXButtonClick}
    >
      <div className="flex items-center gap-1">
        {selectedFolderNames.length}개 선택됨
        <Trash
          className="w-4 h-4 text-gray-700"
          color={hasSelectedFolder ? "white" : undefined}
        />
      </div>
    </Button>
  );
};

const XButton = ({ target }: SelectionModeButtonProps) => {
  const [, setIsSelectionMode] = useAtom(isSelectionModeAtom);

  const [, setSelectedImages] = useAtom(selectedImagesAtom);
  const [, setSelectedFolderNames] = useAtom(selectedFolderNamesAtom);

  const handleXButtonClick = async () => {
    if (target === "images") {
      setSelectedImages([]);
    } else {
      setSelectedFolderNames([]);
    }

    setIsSelectionMode(false);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10"
      onClick={handleXButtonClick}
    >
      <X />
    </Button>
  );
};

const SelectionModeButton = () => {
  const [isSelectionMode, setIsSelectionMode] = useAtom(isSelectionModeAtom);

  const handleSelectionModeButtonClick = () => {
    setIsSelectionMode(!isSelectionMode);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10"
      onClick={handleSelectionModeButtonClick}
    >
      <Check />
    </Button>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSelectionMode = useAtomValue(isSelectionModeAtom);

  const { categoryName, imageFolderName } = useParams() as {
    categoryName?: string;
    imageFolderName?: string;
  };

  return (
    <main className="w-full max-w-app-container mx-auto min-h-full">
      <div className="flex items-center justify-between h-16 pl-2 pr-4">
        <div className="flex items-center gap-2">
          <BackButton />
          {isSelectionMode ? (
            <TrashCanButton
              target={imageFolderName && categoryName ? "images" : "folders"}
            />
          ) : imageFolderName ? (
            <h3 className="text-xl font-semibold">
              {decodeURIComponent(imageFolderName)}
            </h3>
          ) : (
            <h3 className="text-xl font-semibold">
              {decodeURIComponent(categoryName ?? "")}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isSelectionMode ? (
            <XButton
              target={imageFolderName && categoryName ? "images" : "folders"}
            />
          ) : (
            <SelectionModeButton />
          )}

          {imageFolderName && categoryName ? (
            <AddImagesToFolderButton
              categoryName={categoryName}
              imageFolderName={imageFolderName}
            />
          ) : categoryName ? (
            <AddImageFolderButton categoryName={categoryName} />
          ) : (
            <AddFolderButton />
          )}
        </div>
      </div>

      {children}
    </main>
  );
}
