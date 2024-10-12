"use client";

import { Button } from "@/components/ui/button";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
import { useFolderNamesQuery } from "@/lib/queries";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { FolderIcon } from "lucide-react";
import Image from "next/image";
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

  const { data: folderNames = [] } = useFolderNamesQuery({
    categoryName: params.categoryName,
  });

  const handleFolderSelectButtonClick = (folderName: string) => {
    setCategoryName(params.categoryName);
    setFolderName(folderName);

    router.push("/home");
  };

  return (
    <div className="w-full h-full mx-auto p-4">
      <div className="w-full h-full max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {folderNames.map((folderName) => (
              <motion.div
                key={folderName}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group flex flex-col justify-center items-center gap-2 p-5"
              >
                <Image
                  src="/folder-icon.png"
                  alt="폴더 아이콘"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  width={24}
                  height={24}
                />
                <h3 className="font-semibold text-lg text-center">
                  {folderName}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center">
                  <FolderIcon className="w-4 h-4 mr-1" />
                  {0}개의 폴더
                </p>
                <div className="w-full flex justify-center items-center gap-2 mt-2">
                  <Button
                    onClick={() => handleFolderSelectButtonClick(folderName)}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
