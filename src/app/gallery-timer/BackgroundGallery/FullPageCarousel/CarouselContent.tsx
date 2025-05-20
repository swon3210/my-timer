import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

export function CarouselControls({
  onPrevClick,
  onNextClick,
}: CarouselControlsProps) {
  return (
    <>
      <button
        className="absolute z-50 left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
        onClick={onPrevClick}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute z-50 right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
        onClick={onNextClick}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
}
