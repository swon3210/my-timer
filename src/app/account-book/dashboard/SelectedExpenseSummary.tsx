import MoneyIcon from "@/app/assets/icons/ic_money";

function SmallExpenseProgressCircle() {
  // 임시로 진척률 계산 (실제 로직으로 대체 가능)
  const totalExpense = 360000;
  const monthlyBudget = 500000; // 예시 예산
  const progressPercentage = Math.min(
    (totalExpense / monthlyBudget) * 100,
    100
  );

  const radius = 27; // 원의 반지름
  const strokeWidth = 4; // 선 두께
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center w-18 h-18">
      <svg height={72} width={72} className="transform -rotate-90">
        {/* 배경 원 */}
        <circle
          stroke="rgba(255, 255, 255, 0.2)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={36}
          cy={36}
        />
        {/* 진척도 원 */}
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={36}
          cy={36}
          className="transition-all duration-500 ease-in-out"
        />
        {/* 중앙 텍스트 */}
        <text
          x="36"
          y="40"
          textAnchor="middle"
          className="text-xs font-bold fill-white transform rotate-90"
          style={{ transformOrigin: "36px 36px" }}
        >
          {Math.round(progressPercentage)}%
        </text>
      </svg>
    </div>
  );
}

export default function SelectedExpenseSummary() {
  return (
    <div className="rounded-3xl bg-primary flex">
      <div className="px-1">
        <SmallExpenseProgressCircle />
      </div>

      <div className="w-[1px] h-full bg-white" />

      <div className="flex items-center px-4 gap-2">
        <MoneyIcon className="w-6 h-6" />

        <div className="flex-1 text-gray-800 flex flex-col justify-center">
          <p className="text-xs">지난달 지출</p>
          <p className="text-sm font-bold">₩ 100,000</p>
        </div>
      </div>
    </div>
  );
}
