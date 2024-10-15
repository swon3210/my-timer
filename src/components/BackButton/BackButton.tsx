"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import clsx from "clsx";

const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button variant="ghost" size="icon" className="mr-2" onClick={handleClick}>
      <ArrowLeft className={clsx("h-6 w-6", className)} />
    </Button>
  );
};

export default BackButton;
