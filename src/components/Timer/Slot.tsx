"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const items = ["🍒", "🍋", "🍇", "🍊", "🍉", "🍓", "🍍", "🥝"];

export default function Component() {
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    slotRefs.current.forEach((slot) => {
      if (slot) {
        const randomScrollTop = Math.floor(
          Math.random() * (slot.scrollHeight / 3)
        );
        slot.scrollTop = randomScrollTop + slot.scrollHeight / 3;

        slot.addEventListener("scroll", handleScroll);
      }
    });

    return () => {
      slotRefs.current.forEach((slot) => {
        if (slot) {
          slot.removeEventListener("scroll", handleScroll);
        }
      });
    };
  }, []);

  const handleScroll = (event: Event) => {
    const slot = event.target as HTMLDivElement;
    const scrollTop = slot.scrollTop;
    const scrollHeight = slot.scrollHeight;
    const clientHeight = slot.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      // 최하단에 도달했을 때
      slot.scrollTop = scrollHeight / 3;
    } else if (scrollTop <= 0) {
      // 최상단에 도달했을 때
      slot.scrollTop = scrollHeight / 3;
    }
  };

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    slotRefs.current.forEach((slot, index) => {
      if (slot) {
        const fullSpins = 2; // 완전한 회전 수
        const itemHeight = slot.scrollHeight / (items.length * 3);
        const targetScrollTop =
          slot.scrollTop +
          (fullSpins * slot.scrollHeight) / 3 +
          Math.floor(Math.random() * items.length) * itemHeight;

        slot.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });

        // 마지막 슬롯의 애니메이션이 끝나면 spinning 상태를 false로 설정
        if (index === slotRefs.current.length - 1) {
          setTimeout(() => setSpinning(false), 1000 * fullSpins);
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-indigo-800 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Infinite Snap Slot Machine
        </h1>
        <div className="flex justify-center space-x-4 mb-6">
          {[0, 1, 2].map((_, index) => (
            <div
              key={index}
              className="w-20 h-32 overflow-hidden rounded-lg bg-gray-200 shadow-inner"
            >
              <div
                ref={(el) => (slotRefs.current[index] = el)}
                className="flex flex-col items-center transition-all duration-1000 ease-in-out"
                style={{
                  height: "300%",
                  overflowY: "scroll",
                  scrollSnapType: "y mandatory",
                }}
              >
                {Array(3)
                  .fill(items)
                  .flat()
                  .map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-center w-full h-32 text-5xl"
                      style={{ scrollSnapAlign: "start" }}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg ${
            spinning
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg transform transition-all duration-150`}
          onClick={handleSpin}
          disabled={spinning}
        >
          {spinning ? "Spinning..." : "Spin"}
        </motion.button>
      </div>
    </div>
  );
}
