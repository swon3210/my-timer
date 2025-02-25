"use client";

import { Button } from "@/components/ui/button";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { ImagesIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavigateToFolderButton({
  selectedImageIndex,
  className,
}: {
  selectedImageIndex: number;
  className?: string;
}) {
  const categoryName = useAtomValue(categoryNameAtom);
  const folderName = useAtomValue(folderNameAtom);
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/categories/${categoryName}/${folderName}#${selectedImageIndex}`
    );
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn("w-10 h-10", className)}
    >
      <ImagesIcon className="w-4 h-4" />
    </Button>
  );
}
