"use client";

import { combineRefs } from "@/lib/combineRef";
import CarouselSlide from "./CarouselSlides";
import { forwardRef, useEffect, useRef } from "react";

const IMAGE_PER_PAGE = 10;

const getSlides = (imageUrls: string[], imageIndex: number) => {
  return imageUrls
    .slice(0, imageIndex + IMAGE_PER_PAGE)
    .map((imageUrl) => `url('${imageUrl?.replaceAll("'", "\\'")}')`);
};

const FullPageCarousel = forwardRef<
  HTMLDivElement,
  {
    imageIndex: number;
    imageUrls: string[];
    onImageClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    onImageSlide: (index: number) => void;
  }
>(({ imageIndex, imageUrls, onImageClick, onImageSlide }, forwardRef) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const combinedRef = combineRefs(containerRef, forwardRef);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slides = getSlides(imageUrls, imageIndex);

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
      ref={combinedRef}
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
          className="snap-center snap-always flex-none w-full h-full"
        />
      ))}
      {/* <CarouselControls onPrevClick={() => {}} onNextClick={() => {}} /> */}
    </div>
  );
});

FullPageCarousel.displayName = "FullPageCarousel";

export default FullPageCarousel;
