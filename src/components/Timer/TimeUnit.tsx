import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import usePlatform from "@/lib/hooks";
import { formatTime } from "./_utils";

import type { TimeUnitType } from "./_types";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

const TimeUnit = ({
  value,
  unit,
  setTime,
}: {
  value: number;
  unit: TimeUnitType;
  setTime: (unit: TimeUnitType, value: number) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const timeValuesContainerRef = useRef<HTMLDivElement>(null);
  const timeUnitValuesRef = useRef<HTMLDivElement[]>([]);

  const { platform } = usePlatform();

  const timeUnitValues =
    unit === "hours"
      ? Array(100)
          .fill(0)
          .map((_, index) => index)
      : Array(60)
          .fill(0)
          .map((_, index) => index);

  // TODO : 더 나은 이름 짓기 & 확장 기능 구현
  const changedTimeUnitValues = [
    ...timeUnitValues,
    ...timeUnitValues,
    ...timeUnitValues,
    ...timeUnitValues,
  ];

  const changeTimeByDirection = (
    unit: TimeUnitType,
    direction: "up" | "down"
  ) => {
    const increment = direction === "up" ? 1 : -1;
    switch (unit) {
      case "hours":
        setTime(unit, Math.max(0, Math.min(99, value + increment)));
        break;
      case "minutes":
      case "seconds":
        const newTimeValue = value + increment;

        if (newTimeValue < 0) {
          setTime(unit, 59);
        } else if (newTimeValue > 59) {
          setTime(unit, 0);
        } else {
          setTime(unit, newTimeValue);
        }
        break;
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;

    const valueItemHeight = scrollHeight / changedTimeUnitValues.length;

    const selectedValueItemIndex = Math.floor(scrollTop / valueItemHeight);

    setTime(unit, changedTimeUnitValues[selectedValueItemIndex + 1]);
  };

  const handleTouchStart = () => {
    setIsFocused(true);

    const handleScrollEnd = () => {
      setIsFocused(false);
      timeValuesContainerRef.current?.removeEventListener(
        "scrollend",
        handleScrollEnd
      );
    };

    timeValuesContainerRef.current?.addEventListener(
      "scrollend",
      handleScrollEnd
    );
  };

  useLayoutEffect(() => {
    if (timeUnitValuesRef.current.length > 0) {
      timeUnitValuesRef.current[timeUnitValues.length].scrollIntoView({
        block: "center",
      });
    }
  }, [platform, timeUnitValues.length]);

  if (platform === "WEB-PC") {
    return (
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="sm"
          className="w-full p-0"
          onClick={() => changeTimeByDirection(unit, "up")}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <div className="text-2xl font-bold my-2">{formatTime(value)}</div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full p-0"
          onClick={() => changeTimeByDirection(unit, "down")}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-36">
      {/* <div className="absolute top-0 left-0 w-full h-12 bg-white/80 z-10 pointer-events-none"></div> */}
      <div
        ref={timeValuesContainerRef}
        className="flex flex-col items-center h-full overflow-y-auto snap-y snap-mandatory scrollbar-hidden"
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
      >
        {changedTimeUnitValues.map((timeUnitValue, index) => (
          <div
            ref={(el) => {
              if (el) {
                timeUnitValuesRef.current[index] = el;
              }
            }}
            key={index}
            className={clsx(
              "text-2xl font-bold py-2 last:pb-0 snap-start transition-colors duration-700",
              isFocused && "text-primary"
            )}
          >
            {formatTime(timeUnitValue)}
          </div>
        ))}
      </div>
      {/* <div className="absolute bottom-0 left-0 w-full h-12 bg-white/80 z-10 pointer-events-none"></div> */}
    </div>
  );
};

export default TimeUnit;
