"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-10", className)}
      onClick={handleClick}
    >
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
