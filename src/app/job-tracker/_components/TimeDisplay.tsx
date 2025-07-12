"use client";

interface TimeDisplayProps {
  currentTime: Date;
}

export default function TimeDisplay({ currentTime }: TimeDisplayProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-gray-800 mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-base text-gray-600">{formatDate(currentTime)}</div>
      </div>
    </div>
  );
}
