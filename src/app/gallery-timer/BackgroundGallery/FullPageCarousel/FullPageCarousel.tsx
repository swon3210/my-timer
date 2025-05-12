"use client";

import { CarouselSlide } from "./CarouselSlides";
import { CarouselControls } from "./CarouselContent";

const getSlides = (imageUrls: string[]) => {
  return imageUrls.map(
    (imageUrl) => `url('${imageUrl?.replaceAll("'", "\\'")}')`
  );
};

export default function FullPageCarousel({
  imageUrls,
  onImageClick,
}: {
  imageUrls: string[];
  onImageClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  // const [[page, direction], setPage] = useState([0, 0]);
  // const [isDragging, setIsDragging] = useState(false);

  const slides = getSlides(imageUrls);

  // Add first slide to end and last slide to beginning for infinite effect
  // const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  // const paginate = useCallback(
  //   (newDirection: number) => {
  //     setPage([page + newDirection, newDirection]);
  //   },
  //   [page, setPage]
  // );

  // // TODO : 맨 끝에서 wrap 이 실행될 때는 매이메이션이 트리거되지 않도록 설정해야함.
  // const wrap = (index: number, length: number) => {
  //   return ((index % length) + length) % length;
  // };

  // const currentSlide = extendedSlides[wrap(page, extendedSlides.length)];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isDragging) {
  //       paginate(1);
  //     }
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [isDragging, paginate]); // Added paginate to dependencies

  // useEffect(() => {
  //   if (page === -1) {
  //     setTimeout(() => setPage([slides.length - 1, 0]), 300);
  //   } else if (page === slides.length) {
  //     setTimeout(() => setPage([0, 0]), 300);
  //   }
  // }, [page]);

  return (
    <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
      {slides.map((backgroundImage) => (
        <CarouselSlide
          key={backgroundImage}
          backgroundImage={backgroundImage}
          onImageClick={onImageClick}
          className="snap-center flex-none w-full h-full"
        />
      ))}
      <CarouselControls onPrevClick={() => {}} onNextClick={() => {}} />
    </div>
  );
}
