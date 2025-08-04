import GoalItemList from "./GoalItemList";
import Link from "next/link";
import GoalSummary from "./GoalSummary";

export default function GoalSection() {
  return (
    <div className="animate-fade-in delay-150">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">목표 관리</h3>
        <Link
          href="/account-book/goals"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
        >
          <span>전체보기</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GoalSummary />

        <GoalItemList />
      </div>
    </div>
  );
}
