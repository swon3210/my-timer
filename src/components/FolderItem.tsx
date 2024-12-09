import { motion } from "framer-motion";
import { FolderIcon } from "lucide-react";
import Image from "next/image";

type FolderItemProps = {
  type: "folder" | "image-folder";
  folderName: string;
  count: number;
  imageUrl: string;
  imageAlt: string;
  bottomComponent?: React.ReactNode;
};

const FolderItem = ({
  type,
  folderName,
  count,
  imageUrl,
  imageAlt,
  bottomComponent,
}: FolderItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg shadow-lg group flex flex-col justify-center items-center h-48 border border-gray-200 p-2 py-5"
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        className="object-cover transition-transform duration-300 group-hover:scale-110 mb-2"
        width={24}
        height={24}
      />
      <h2 className="font-semibold text-lg mb-1 text-center">{folderName}</h2>
      <p className="text-sm text-muted-foreground flex items-center">
        <FolderIcon className="w-4 h-4 mr-1" />
        {count}개의 {type === "folder" ? "폴더" : "이미지"}
      </p>
      <div className="grow" />
      {bottomComponent}
    </motion.div>
  );
};

export default FolderItem;
