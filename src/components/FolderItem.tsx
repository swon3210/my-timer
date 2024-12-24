import { motion } from "framer-motion";
import { FolderIcon } from "lucide-react";
import Image from "next/image";

type FolderItemProps = {
  type: "folder" | "image-folder";
  folderName: string;
  count: number;
  topComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
};

const FolderItem = ({
  type,
  folderName,
  count,
  topComponent,
  bottomComponent,
}: FolderItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg shadow-lg group flex flex-col justify-center items-center border border-gray-200"
    >
      <div className="flex items-center justify-center w-full h-36">
        {topComponent ? (
          topComponent
        ) : (
          <Image
            src="/folders-icon.png"
            alt="폴더"
            className="object-cover transition-transform duration-300 group-hover:scale-110 relative top-5"
            width={48}
            height={48}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <h2 className="font-semibold text-md mb-1 text-center line-clamp-1">
          {folderName}
        </h2>
        <p className="text-xs text-muted-foreground flex items-center">
          <FolderIcon className="w-4 h-4 mr-1" />
          {count}개의 {type === "folder" ? "폴더" : "이미지"}
        </p>
        {bottomComponent != null ? bottomComponent : <div className="grow" />}
      </div>
    </motion.div>
  );
};

export default FolderItem;
