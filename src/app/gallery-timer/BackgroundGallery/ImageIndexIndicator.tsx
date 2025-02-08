import { cn } from "@/lib/utils";

type ImageIndexIndicatorProps = {
  currentIndex: number;
  totalImages: number;
  className?: string;
};

export default function ImageIndexIndicator({
  currentIndex,
  totalImages,
  className,
}: ImageIndexIndicatorProps) {
  return (
    <div className={cn("text-lg whitespace-nowrap", className)}>
      {currentIndex + 1} / {totalImages}
    </div>
  );
}
