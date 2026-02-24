/* eslint-disable @next/next/no-img-element */
import FolderItem from "@/components/FolderItem";
import { Button } from "@/components/ui/button";
import useImagesQuery from "@/domains/images/useImagesQuery";
import {
  categoryNameAtom,
  folderNameAtom,
  imageUrlIndexAtom,
} from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ImageFolderItemProps = {
  categoryId: string;
  folderName: string;
};

const ImagePreview = ({ imageUrls }: { imageUrls: string[] }) => {
  const [firstImageUrl] = imageUrls;

  if (!firstImageUrl) {
    return null;
  }

  return (
    <div className="size-full">
      <img
        key={firstImageUrl}
        src={firstImageUrl}
        alt="이미지 미리보기"
        className="object-cover object-top w-full h-full"
        loading="lazy"
      />
    </div>
  );
};

const ImageFolderItem = ({
  categoryId,
  folderName,
}: ImageFolderItemProps) => {
  const router = useRouter();

  const [, setCategoryName] = useAtom(categoryNameAtom);
  const [, setFolderName] = useAtom(folderNameAtom);
  const [, setImageUrlIndex] = useAtom(imageUrlIndexAtom);

  const { data: imageUrls = [] } = useImagesQuery({
    categoryId,
    folderName,
  });

  const handleFolderSelectButtonClick = (folderName: string) => {
    setCategoryName(categoryId);
    setFolderName(folderName);
    setImageUrlIndex(0);

    router.push("/gallery-timer");
  };

  return (
    <FolderItem
      type="image-folder"
      folderName={folderName}
      count={imageUrls.length}
      topComponent={<ImagePreview imageUrls={imageUrls} />}
      bottomComponent={
        <div className="w-full flex justify-center items-center gap-2 mt-2">
          <Button onClick={() => handleFolderSelectButtonClick(folderName)}>
            선택
          </Button>
          <Link
            key={folderName}
            href={`/categories/${categoryId}/${folderName}`}
          >
            <Button variant="secondary">미리보기</Button>
          </Link>
        </div>
      }
    />
  );
};

export default ImageFolderItem;
