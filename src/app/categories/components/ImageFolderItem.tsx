/* eslint-disable @next/next/no-img-element */
import FolderItem from "@/components/FolderItem";
import { Button } from "@/components/ui/button";
import useImagesQuery from "@/domains/images/useImagesQuery";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ImageFolderItemProps = {
  categoryName: string;
  folderName: string;
};

const ImagePreview = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <div className="size-full grid grid-cols-2 grid-rows-2">
      {imageUrls.slice(0, 4).map((imageUrl) => (
        <img
          key={imageUrl}
          src={imageUrl}
          alt="이미지 미리보기"
          className="object-cover object-top w-full h-full"
          loading="lazy"
        />
      ))}
    </div>
  );
};

const ImageFolderItem = ({
  categoryName,
  folderName,
}: ImageFolderItemProps) => {
  const router = useRouter();

  const [, setCategoryName] = useAtom(categoryNameAtom);
  const [, setFolderName] = useAtom(folderNameAtom);

  const { data: imageUrls } = useImagesQuery({
    categoryName,
    folderName,
  });

  const handleFolderSelectButtonClick = (folderName: string) => {
    setCategoryName(categoryName);
    setFolderName(folderName);

    router.push("/home");
  };

  return (
    <FolderItem
      type="folder"
      folderName={folderName}
      count={0}
      topComponent={<ImagePreview imageUrls={imageUrls} />}
      bottomComponent={
        <div className="w-full flex justify-center items-center gap-2 mt-2">
          <Button onClick={() => handleFolderSelectButtonClick(folderName)}>
            선택
          </Button>
          <Link
            key={folderName}
            href={`/categories/${categoryName}/${folderName}`}
          >
            <Button variant="secondary">미리보기</Button>
          </Link>
        </div>
      }
    />
  );
};

export default ImageFolderItem;
