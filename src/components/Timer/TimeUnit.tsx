import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import usePlatform from "@/lib/hooks";
import { formatTime } from "./_utils";

const TimeUnit = ({
  value,
  unit,
  onTimeChange,
}: {
  value: number;
  unit: "hours" | "minutes" | "seconds";
  onTimeChange: (
    unit: "hours" | "minutes" | "seconds",
    direction: "up" | "down"
  ) => void;
}) => {
  const { platform } = usePlatform();

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => onTimeChange(unit, "up"),
    onSwipedDown: () => onTimeChange(unit, "down"),
    trackMouse: true,
  });

  return (
    <div className="flex flex-col items-center" {...swipeHandlers}>
      {platform === "WEB-PC" && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full p-0"
          onClick={() => onTimeChange(unit, "up")}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}
      <div className="text-2xl font-bold my-2">{formatTime(value)}</div>
      {platform === "WEB-PC" && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full p-0"
          onClick={() => onTimeChange(unit, "down")}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default TimeUnit;
