"use client";

import { Button } from "@/components/ui/button";
import { categoryNameAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { FoldersIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavigateToCategoryButton({
  className,
}: {
  className?: string;
}) {
  const categoryName = useAtomValue(categoryNameAtom);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/categories/${categoryName}`);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn("w-10 h-10", className)}
    >
      <FoldersIcon className="w-4 h-4" />
    </Button>
  );
}
