import { Goal, Priority } from "@/app/api/account-books/goals/types";
import { useTransactionsQuery } from "@/domains/account-book/transactions/useTransactionsQuery";

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-800";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800";
    case "LOW":
      return "bg-green-100 text-green-800";
  }
};

const getPriorityText = (priority: Priority) => {
  switch (priority) {
    case "HIGH":
      return "높음";
    case "MEDIUM":
      return "보통";
    case "LOW":
      return "낮음";
  }
};

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export default function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const { data: transactions } = useTransactionsQuery();

  const incomeTransactions =
    transactions?.filter(
      (transaction) =>
        transaction.type === "INCOME" &&
        transaction.categoryId === goal.categoryId
    ) ?? [];

  const totalIncome = incomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const progress = (totalIncome ?? 0) / (goal.targetAmount ?? 0);
  const progressPercentage = Math.min(Math.floor(progress * 100), 100);
  const remainingAmount = goal.targetAmount - totalIncome;

  const handleDeleteClick = () => {
    if (confirm("이 목표를 삭제하시겠습니까?")) {
      onDelete(goal.id);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          {/* 목표 이미지 */}
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {goal.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={goal.imageUrl}
                alt={goal.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM7 4h10v12a1 1 0 01-1 1H8a1 1 0 01-1-1V4z"
                />
              </svg>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-bold text-gray-800">
                {goal.displayName}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  goal.priority
                )}`}
              >
                {getPriorityText(goal.priority)}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                {goal.description}
              </span>
            </div>

            {goal.description && (
              <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>마감: {goal.endAt}</span>
              <span>달성률: {progressPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(goal)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            ₩{totalIncome?.toLocaleString()} / ₩
            {goal.targetAmount.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-blue-600">
            {progress.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 rounded-full h-3 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 남은 금액 */}
      <div className="text-sm text-gray-600">
        {remainingAmount > 0
          ? `목표까지 ₩${remainingAmount.toLocaleString()} 남음`
          : `목표 달성!`}
      </div>
    </div>
  );
}
