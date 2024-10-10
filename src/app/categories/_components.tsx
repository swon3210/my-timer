"use client";

import clsx from "clsx";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <ArrowLeftCircle size={32} />
    </button>
  );
};
