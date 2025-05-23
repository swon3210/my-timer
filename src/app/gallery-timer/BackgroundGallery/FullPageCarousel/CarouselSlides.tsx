import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CarouselSlideProps {
  backgroundImage: string;
  onImageClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ backgroundImage, onImageClick, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `relative w-full min-w-full h-full flex items-center justify-center overflow-hidden`,
          className
        )}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "blur(20px)", // 블러 효과 추가
            transform: "scale(1.1)", // 블러 경계 처리
          }}
        />
        <div
          className="absolute top-0 left-0 z-10 w-full h-full"
          style={{
            backgroundImage,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onClick={onImageClick}
        />
      </div>
    );
  }
);

CarouselSlide.displayName = "CarouselSlide";

export default CarouselSlide;
