import { Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ImageShuffleButtonProps = {
  onClick: () => void;
  className?: string;
};

export default function ImageShuffleButton({
  onClick,
  className,
}: ImageShuffleButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn("size-10", className)}
    >
      <Shuffle size={24} />
    </Button>
  );
}
