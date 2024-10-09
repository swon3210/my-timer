import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import usePlatform from "@/lib/hooks";
import { formatTime } from "./_utils";

import type { TimeUnitType } from "./_types";

const TimeUnit = ({
  value,
  unit,
  setTime,
}: {
  value: number;
  unit: TimeUnitType;
  setTime: (unit: TimeUnitType, value: number) => void;
}) => {
  const { platform } = usePlatform();

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

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => changeTimeByDirection(unit, "up"),
    onSwipedDown: () => changeTimeByDirection(unit, "down"),
    trackMouse: true,
  });

  if (platform === "WEB-PC") {
    return (
      <div className="flex flex-col items-center" {...swipeHandlers}>
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
    <div
      className="flex flex-col justify-center items-center h-96 overflow-y-auto"
      {...swipeHandlers}
    >
      <div className="text-2xl font-bold my-2">{formatTime(value)}</div>
    </div>
  );
};

export default TimeUnit;
