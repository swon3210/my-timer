import { Goal } from "@/app/api/account-books/goals/types";
import { useSavingsQuery } from "@/domains/account-book/dashboard/useSavingsQuery";
import { useGoalsQuery } from "@/domains/account-book/goal/useGoalsQuery";
import { isEmpty } from "@/utils/text";
import Link from "next/link";

function GoalItem({
  goal,
  totalSavings,
}: {
  goal: Goal;
  totalSavings: number;
}) {
  const getGoalProgress = (goal: Goal) => {
    const progress = (totalSavings / goal.targetAmount) * 100;

    return progress > 100 ? 100 : progress;
  };

  return (
    <div
      key={goal.id}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all hover-lift"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <h5 className="font-bold text-gray-800">{goal.displayName}</h5>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>마감: {isEmpty(goal.endAt) ? "미정" : goal.endAt}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">
            ₩{totalSavings.toLocaleString()} / ₩
            {goal.targetAmount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">{getGoalProgress(goal)}% 달성</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 rounded-full h-2 transition-all duration-1000"
          style={{ width: `${getGoalProgress(goal)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function GoalItemList() {
  const { data: goals } = useGoalsQuery();
  const { data: savingsData } = useSavingsQuery();

  const onGoingGoals = goals?.filter((goal) => goal.status === "ON-GOING");

  return (
    <div className="lg:col-span-2 space-y-4">
      {onGoingGoals?.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          totalSavings={savingsData?.totalSavings ?? 0}
        />
      ))}

      <Link
        href="/account-book/goals"
        className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        모든 목표 보기
      </Link>
    </div>
  );
}
