"use client";

interface CheckInOutButtonProps {
  isWorking: boolean;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export default function CheckInOutButton({
  isWorking,
  onCheckIn,
  onCheckOut,
}: CheckInOutButtonProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="text-center">
        {!isWorking ? (
          <button
            onClick={onCheckIn}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors w-full"
          >
            출근하기
          </button>
        ) : (
          <button
            onClick={onCheckOut}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors w-full"
          >
            퇴근하기
          </button>
        )}
      </div>
    </div>
  );
}
