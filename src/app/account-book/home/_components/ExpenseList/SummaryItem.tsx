import { formatCurrency } from "@/utils/format";

function SummaryItem({
  totalExpense,
  totalBudget,
  overallProgress,
}: {
  totalExpense: number;
  totalBudget: number;
  overallProgress: number;
}) {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          지출 현황
          <br />
          <span className="text-sm text-gray-600">(2월 10일 - 2월 16일)</span>
        </h2>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-800">
            {formatCurrency(totalExpense)}
          </div>
          <div className="text-sm text-gray-600">
            / {formatCurrency(totalBudget)}
          </div>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full ${
            overallProgress > 100
              ? "bg-gradient-to-r from-red-400 to-red-600"
              : "bg-gradient-to-r from-green-400 to-emerald-600"
          }`}
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <span
          className={`font-medium ${
            overallProgress > 100 ? "text-red-600" : "text-gray-700"
          }`}
        >
          전체 {overallProgress.toFixed(1)}% 사용
        </span>
        <span className="text-gray-600">
          남은 예산: {formatCurrency(Math.max(0, totalBudget - totalExpense))}
        </span>
      </div>
    </div>
  );
}

export default SummaryItem;
