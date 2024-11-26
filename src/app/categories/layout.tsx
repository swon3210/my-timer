"use client";

import BackButton from "@/components/BackButton";
import ImageUploadButton from "@/components/ImageUploadButton";
import { Button } from "@/components/ui/button";
import { useAddFolderMutation, useAddImagesMutation } from "@/lib/mutations";
import {
  getCategoryNamesQueryKey,
  getImageFolderNamesQueryKey,
  getImagesQueryKey,
  useInvalidateQuery,
} from "@/lib/queries";
import { FolderPlus } from "lucide-react";
import { useParams } from "next/navigation";

// export const metadata = {
//   title: "My Timer 사진 폴더 선택",
//   description: "사진 폴더를 선택하는 페이지",
// };

const AddFolderButton = () => {
  const { mutateAsync: addFolder } = useAddFolderMutation();
  const invalidateQuery = useInvalidateQuery();

  const handleClick = async () => {
    const folderName = prompt("폴더 이름을 입력하세요.");

    if (!folderName) {
      return;
    }

    await addFolder({ path: `images/${folderName}` });

    void invalidateQuery(getCategoryNamesQueryKey());
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <FolderPlus className="w-4 h-4 text-gray-700" />
    </Button>
  );
};

const AddImageFolderButton = ({ categoryName }: { categoryName: string }) => {
  const { mutateAsync: addImages } = useAddImagesMutation();
  const invalidateQuery = useInvalidateQuery();

  const handleImagesUploaded = async (images: File[]) => {
    const folderName = prompt("이미지 폴더 이름을 입력하세요.");

    if (!folderName) {
      return;
    }

    await addImages({
      path: `images/${categoryName}/${folderName}`,
      images,
    });

    void invalidateQuery(getImageFolderNamesQueryKey(categoryName));
  };

  return <ImageUploadButton onImagesUploaded={handleImagesUploaded} />;
};

const AddImagesToFolderButton = ({
  categoryName,
  imageFolderName,
}: {
  categoryName: string;
  imageFolderName: string;
}) => {
  const { mutateAsync: addImages } = useAddImagesMutation();
  const invalidateQuery = useInvalidateQuery();

  const handleImagesUploaded = async (images: File[]) => {
    await addImages({
      path: `images/${categoryName}/${imageFolderName}`,
      images,
    });

    void invalidateQuery(getImagesQueryKey(categoryName, imageFolderName));
  };

  return <ImageUploadButton onImagesUploaded={handleImagesUploaded} />;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categoryName, imageFolderName } = useParams() as {
    categoryName?: string;
    imageFolderName?: string;
  };

  return (
    <main className="w-full max-w-app-container mx-auto min-h-full">
      <div className="flex items-center justify-between h-16 pl-2 pr-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h3 className="text-xl font-semibold">폴더</h3>
        </div>
        {/* 라우팅에 따른 분기로 로직 변경 */}
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

      {children}
    </main>
  );
}
