import { Shuffle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ImageShuffleButtonProps = {
  onClick: () => void;
  className?: string;
};

export default function ImageShuffleButton({
  onClick,
  className,
}: ImageShuffleButtonProps) {
  return (
    <Button onClick={onClick} className={cn("size-10 p-2", className)}>
      <Shuffle size={24} />
    </Button>
  );
}
