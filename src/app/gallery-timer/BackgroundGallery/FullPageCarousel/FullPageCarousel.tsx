"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselSlide } from "./CarouselSlides";
import { CarouselControls } from "./CarouselContent";

const slides = [
  { id: 1, content: "Slide 1", color: "bg-red-500" },
  { id: 2, content: "Slide 2", color: "bg-blue-500" },
  { id: 3, content: "Slide 3", color: "bg-green-500" },
  { id: 4, content: "Slide 4", color: "bg-yellow-500" },
  { id: 5, content: "Slide 5", color: "bg-purple-500" },
];

export default function FullPageCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  // Add first slide to end and last slide to beginning for infinite effect
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page, setPage]
  );

  // TODO : 맨 끝에서 wrap 이 실행될 때는 매이메이션이 트리거되지 않도록 설정해야함.
  const wrap = (index: number, length: number) => {
    return ((index % length) + length) % length;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        paginate(1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging, paginate]); // Added paginate to dependencies

  useEffect(() => {
    if (page === -1) {
      setTimeout(() => setPage([slides.length - 1, 0]), 300);
    } else if (page === slides.length) {
      setTimeout(() => setPage([0, 0]), 300);
    }
  }, [page]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={{
            enter: (direction: number) => {
              return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
              };
            },
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
            },
            exit: (direction: number) => {
              return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
              };
            },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, { offset, velocity }) => {
            setIsDragging(false);
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full"
        >
          <CarouselSlide
            {...extendedSlides[wrap(page, extendedSlides.length)]}
          />
        </motion.div>
      </AnimatePresence>
      <CarouselControls
        onPrevClick={() => paginate(-1)}
        onNextClick={() => paginate(1)}
      />
    </div>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
