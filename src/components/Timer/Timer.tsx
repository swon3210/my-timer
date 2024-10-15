"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatTime } from "./_utils";
import TimeUnit from "./TimeUnit";
import { TimeUnitType } from "./_types";
import clsx from "clsx";

type TimerProps = {
  standardSeconds: Readonly<number>;
  className?: string;
  onStandardSecondsReached: () => void;
};

export default function Timer({
  standardSeconds,
  className,
  onStandardSecondsReached,
}: TimerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [mode, setMode] = useState<"before-start" | "paused" | "on-going">(
    "before-start"
  );
  const [displayTime, setDisplayTime] = useState(0);
  // TODO : initialTime 은 ref 로 관리해야함
  const [initialTime, setInitialTime] = useState(0);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const progress =
    initialTime === 0 ? 0 : ((initialTime - displayTime) / initialTime) * 100;

  const setTimerInterval = () => {
    intervalRef.current = setInterval(() => {
      setDisplayTime((prevDisplayedTime) => {
        if (prevDisplayedTime <= 0) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          setMode("before-start");
          return 0;
        }

        return prevDisplayedTime - 1;
      });
    }, 1000);
  };

  const setTime = (unit: TimeUnitType, value: number) => {
    switch (unit) {
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
    }
  };

  const handleStartTimerButtonClick = () => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      setMode("on-going");

      const time = hours * 3600 + minutes * 60 + seconds;
      setInitialTime(time);
      setDisplayTime(time);
      setTimerInterval();
    }
  };

  const handleContinueTimerButtonClick = () => {
    setMode("on-going");
    setTimerInterval();
  };

  const handlePauseTimerButtonClick = () => {
    setMode("paused");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleStopTimerButtonClick = () => {
    setMode("before-start");
  };

  useEffect(() => {
    if ((initialTime - displayTime) % standardSeconds === 0) {
      onStandardSecondsReached();
    }
  }, [initialTime, displayTime, standardSeconds, onStandardSecondsReached]);

  return (
    <div
      className={clsx(
        "w-full flex flex-col items-center p-6 max-w-72",
        className
      )}
    >
      {mode !== "before-start" && (
        <div className="relative w-64 h-64 mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              opacity={0.2}
              r="48"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary"
              strokeWidth="4"
              strokeDasharray={300}
              strokeDashoffset={300 - progress * 3}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              opacity={0.4}
              r="48"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold opacity-50">
            {formatTime(Math.floor(displayTime / 3600))}:
            {formatTime(Math.floor((displayTime % 3600) / 60))}:
            {formatTime(displayTime % 60)}
          </div>
        </div>
      )}

      {mode === "before-start" && (
        <div className="flex justify-center items-center space-x-4 mb-6">
          <TimeUnit value={hours} unit="hours" setTime={setTime} />
          <span className="text-2xl font-bold my-2">:</span>
          <TimeUnit value={minutes} unit="minutes" setTime={setTime} />
          <span className="text-2xl font-bold my-2">:</span>
          <TimeUnit value={seconds} unit="seconds" setTime={setTime} />
        </div>
      )}

      <div className="flex justify-center space-x-4">
        {mode === "before-start" ? (
          <Button
            size="lg"
            className="rounded-full"
            onClick={handleStartTimerButtonClick}
          >
            시작
          </Button>
        ) : mode === "paused" ? (
          <div className="flex gap-2">
            <Button
              size="lg"
              className="rounded-full"
              onClick={handleContinueTimerButtonClick}
            >
              계속
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full"
              onClick={handleStopTimerButtonClick}
            >
              중지
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            onClick={handlePauseTimerButtonClick}
          >
            일시정지
          </Button>
        )}
      </div>
    </div>
  );
}
