"use client";

import CarouselSlide from "./CarouselSlides";
import { useEffect, useRef } from "react";

const getSlides = (imageUrls: string[]) => {
  return imageUrls.map(
    (imageUrl) => `url('${imageUrl?.replaceAll("'", "\\'")}')`
  );
};

export default function FullPageCarousel({
  imageIndex,
  imageUrls,
  onImageClick,
  onImageSlide,
}: {
  imageIndex: number;
  imageUrls: string[];
  onImageClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onImageSlide: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slides = getSlides(imageUrls);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              onImageSlide(index);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 1,
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => {
      slideRefs.current.forEach((slide) => {
        if (slide) observer.unobserve(slide);
      });
    };
  }, [onImageSlide]);

  useEffect(() => {
    const currentSlide = slideRefs.current[imageIndex];
    if (currentSlide) {
      currentSlide.scrollIntoView();
    }
  }, [imageIndex]);

  return (
    <div
      ref={containerRef}
      className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
    >
      {slides.map((backgroundImage, index) => (
        <CarouselSlide
          key={backgroundImage}
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              slideRefs.current[index] = el;
            }
          }}
          backgroundImage={backgroundImage}
          onImageClick={onImageClick}
          className="snap-center flex-none w-full h-full"
        />
      ))}
      {/* <CarouselControls onPrevClick={() => {}} onNextClick={() => {}} /> */}
    </div>
  );
}
