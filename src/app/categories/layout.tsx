"use client";

import { useAtom, useAtomValue } from "jotai";
import { Bookmark, Check, FolderPlus, Trash, Upload, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import useDeleteFoldersMutation from "@/domains/folders/useDeleteFoldersMutation";
import useFolderNamesQuery from "@/domains/folders/useFolderNamesQuery";
import useImageFolderNamesQuery, {
  getImageFolderNamesQueryKey,
} from "@/domains/folders/useImageFolderNamesQuery";
import useImagesQuery, {
  getImagesQueryKey,
} from "@/domains/images/useImagesQuery";
import { useUserQuery } from "@/domains/users/useUserQuery";
import {
  isSelectionModeAtom,
  selectedFolderNamesAtom,
  selectedImagesAtom,
} from "@/lib/atoms";
import { useAddFolderMutation } from "@/lib/mutations";
import { useInvalidateQuery } from "@/lib/queries";

import { getUserStoragePath, uploadImages } from "../../lib/firebase";

import useImageUploadDialogOverlay from "./useImageUploadDialogOverlay";
import {
  ImageGroup,
  useImageUploadDialogRef,
} from "./components/ImageUploadDialog/ImageUploadDialog";
import Link from "next/link";
import UserProvider from "../_providers/UserProvider";
import { useGalleriesQuery, getGalleriesQueryKey } from "@/domains/gallery";
import {
  createImageFolder,
  createGalleryImages,
  getImageFolders,
} from "@/domains/gallery/fetchers";

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

    void invalidateQuery(getGalleriesQueryKey());
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

const AddImageFolderButton = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const { data: imageFolderNames } = useImageFolderNamesQuery({ categoryId });
  const { data: user } = useUserQuery();
  const imageUploadDialogRef = useImageUploadDialogRef();

  const invalidateQuery = useInvalidateQuery();

  const { openImageUploadDialog } = useImageUploadDialogOverlay();

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

    for (let index = 0; index < imageGroups.length; index++) {
      const imageGroup = imageGroups[index];
      const folderName = folderNameInputs[index]?.trim();

      if (!folderName) continue;

      imageUploadDialogRef.current?.setAttachedFiles((prev) => {
        return prev.map((attachedFile) => {
          if (attachedFile.folderName === imageGroup.folderName) {
            return { ...attachedFile, status: "uploading" as const };
          }
          return attachedFile;
        });
      });

      // 1. Storage에 이미지 업로드
      const storageFolderPath = getUserStoragePath(
        user,
        `images/${categoryId}/${folderName}`
      );
      const uploadResults = await uploadImages(storageFolderPath, imageGroup.files);

      // 2. Firestore에 폴더 생성
      const newFolder = await createImageFolder({
        galleryId: categoryId,
        galleryName: categoryName,
        name: folderName,
      });

      // 3. Firestore에 이미지 메타데이터 저장
      await createGalleryImages(
        uploadResults.map((result, i) => ({
          galleryId: categoryId,
          folderId: newFolder.id,
          fileName: result.fileName,
          downloadUrl: result.downloadURL,
          storagePath: `${storageFolderPath}/${result.fileName}`,
          order: i,
        }))
      );

      imageUploadDialogRef.current?.setAttachedFiles((prev) => {
        return prev.map((attachedFile) => {
          if (attachedFile.folderName === imageGroup.folderName) {
            return { ...attachedFile, status: "uploaded" as const };
          }
          return attachedFile;
        });
      });
    }

    toast(
      imageGroups.length === 1
        ? `${imageGroups[0].folderName} 폴더에 ${imageGroups[0].files.length}개의 이미지를 업로드하였습니다.`
        : `${imageGroups.length}개의 폴더에 ${imageGroups.reduce(
          (acc, imageGroup) => acc + imageGroup.files.length,
          0
        )}개의 이미지를 업로드하였습니다.`
    );

    // 확실한 갱신을 위해 파라미터 제외 최상위 key 그룹 전체를 무효화
    void invalidateQuery(["galleries"]);
    void invalidateQuery(["folders"]);
    void invalidateQuery(["images"]);
  };

  return (
    <Button
      variant="outline"
      onClick={() =>
        openImageUploadDialog({
          ref: imageUploadDialogRef,
          onImagesUploaded: handleImagesUploaded,
        })
      }
      className="size-10"
    >
      <Upload />
    </Button>
  );
};

const AddImagesToFolderButton = ({
  categoryId,
  imageFolderName,
}: {
  categoryId: string;
  imageFolderName: string;
}) => {
  const imageUploadDialogRef = useImageUploadDialogRef();

  const invalidateQuery = useInvalidateQuery();
  const { data: user } = useUserQuery();

  const { openImageUploadDialog } = useImageUploadDialogOverlay();
  const handleImagesUploaded = async (imageGroups: ImageGroup[]) => {
    if (!user) {
      return;
    }

    // 기존 폴더의 folderId 조회
    const folders = await getImageFolders(categoryId);
    const targetFolder = folders.find((f) => f.name === decodeURIComponent(imageFolderName));

    if (!targetFolder) {
      toast("폴더를 찾을 수 없습니다.");
      return;
    }

    const storageFolderPath = getUserStoragePath(
      user,
      `images/${categoryId}/${imageFolderName.trim()}`
    );

    // 기존 이미지 수를 order 시작값으로 사용
    let orderOffset = targetFolder.imageCount;

    for (const imageGroup of imageGroups) {
      imageUploadDialogRef.current?.setAttachedFiles((prev) => {
        return prev.map((attachedFile) => {
          if (attachedFile.folderName === imageGroup.folderName) {
            return { ...attachedFile, status: "uploading" as const };
          }
          return attachedFile;
        });
      });

      // 1. Storage에 이미지 업로드
      const uploadResults = await uploadImages(storageFolderPath, imageGroup.files);

      // 2. Firestore에 이미지 메타데이터 저장
      await createGalleryImages(
        uploadResults.map((result, i) => ({
          galleryId: categoryId,
          folderId: targetFolder.id,
          fileName: result.fileName,
          downloadUrl: result.downloadURL,
          storagePath: `${storageFolderPath}/${result.fileName}`,
          order: orderOffset + i,
        }))
      );

      orderOffset += imageGroup.files.length;

      imageUploadDialogRef.current?.setAttachedFiles((prev) => {
        return prev.map((attachedFile) => {
          if (attachedFile.folderName === imageFolderName) {
            return {
              ...attachedFile,
              isOptimized: true,
              isUploadedToServer: true,
            };
          }
          return attachedFile;
        });
      });
    }

    toast(
      `${imageGroups.reduce(
        (acc, imageGroup) => acc + imageGroup.files.length,
        0
      )}개의 이미지를 업로드하였습니다.`
    );

    // 확실한 갱신을 위해 최상위 key 그룹 전체 무효화
    void invalidateQuery(["folders"]);
    void invalidateQuery(["images"]);
  };

  return (
    <Button
      variant="outline"
      onClick={() =>
        openImageUploadDialog({
          ref: imageUploadDialogRef,
          onImagesUploaded: handleImagesUploaded,
        })
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
  const { categoryId } = useParams() as {
    categoryId?: string;
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
          categoryId ? `images/${categoryId}/${name}` : `images/${name}`
        )
      ),
      isImageFolder: !!categoryId,
      galleryName: categoryId,
    });

    toast(`${selectedFolderNames.length}개의 폴더가 삭제되었습니다.`);

    setIsSelectionMode(false);
  };

  return (
    <Badge
      variant={hasSelectedFolder ? "destructive" : "secondary"}
      size="lg"
      className="cursor-pointer"
      onClick={handleXButtonClick}
    >
      {selectedFolderNames.length}개 선택됨
      <Trash className="w-4 h-4 ml-1" />
    </Badge>
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

const BookMarkButton = () => {
  return (
    <Link href="/bookmarks">
      <Button variant="outline" size="icon" className="size-10">
        <Bookmark className="w-4 h-4 text-gray-700" />
      </Button>
    </Link>
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

const ImageCount = ({
  categoryId,
  imageFolderName,
}: {
  categoryId: string;
  imageFolderName: string;
}) => {
  const { data: images = [] } = useImagesQuery({
    categoryId,
    folderName: imageFolderName,
  });

  return (
    <span className="text-body-sm text-muted-foreground">
      ({images.length}개 이미지)
    </span>
  );
};

const ItemCount = ({
  isSelectionMode,
  categoryId,
  imageFolderName,
}: {
  isSelectionMode: boolean;
  categoryId: string;
  imageFolderName?: string;
}) => {
  const { data: imageFolderNames = [] } = useImageFolderNamesQuery({
    categoryId,
  });

  if (isSelectionMode) {
    return null;
  }

  return (
    <>
      <span className="text-body-sm text-muted-foreground">
        ({imageFolderNames.length}개 폴더)
      </span>
      {imageFolderName && (
        <ImageCount
          categoryId={categoryId}
          imageFolderName={imageFolderName}
        />
      )}
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isSelectionMode = useAtomValue(isSelectionModeAtom);

  const { categoryId, imageFolderName } = useParams() as {
    categoryId?: string;
    imageFolderName?: string;
  };

  // galleryId로 갤러리 이름 조회 (헤더 타이틀 표시용)
  const { data: galleries = [] } = useGalleriesQuery();
  const currentGallery = galleries.find((g) => g.id === categoryId);
  const categoryName = currentGallery?.name;

  const getTitle = () => {
    if (isSelectionMode) {
      return undefined;
    }
    if (imageFolderName) {
      return decodeURIComponent(imageFolderName);
    }
    return categoryName ?? "갤러리";
  };

  const renderLeftSlot = () => {
    if (isSelectionMode) {
      return (
        <TrashCanButton
          target={imageFolderName && categoryId ? "images" : "folders"}
        />
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span className="text-heading-5">{getTitle()}</span>
        {categoryId && (
          <ItemCount
            isSelectionMode={isSelectionMode}
            categoryId={categoryId}
            imageFolderName={imageFolderName}
          />
        )}
      </div>
    );
  };

  const renderRightSlot = () => (
    <div className="flex items-center gap-2">
      {isSelectionMode ? (
        <XButton
          target={imageFolderName && categoryId ? "images" : "folders"}
        />
      ) : (
        <SelectionModeButton />
      )}

      {imageFolderName && categoryId ? (
        <AddImagesToFolderButton
          categoryId={categoryId}
          imageFolderName={imageFolderName}
        />
      ) : categoryId ? (
        <AddImageFolderButton categoryId={categoryId} categoryName={categoryName ?? ""} />
      ) : (
        <AddFolderButton />
      )}
      <BookMarkButton />
    </div>
  );

  return (
    <UserProvider>
      <main className="w-full max-w-app-container mx-auto min-h-full">
        <PageHeader
          showBackButton
          onBack={() => router.back()}
          leftSlot={renderLeftSlot()}
          rightSlot={renderRightSlot()}
          border
        />
        {children}
      </main>
    </UserProvider>
  );
}
