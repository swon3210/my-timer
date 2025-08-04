import { useGoalsQuery } from "@/domains/account-book/goal/useGoalsQuery";

export default function GoalSummary() {
  const { data: goals } = useGoalsQuery();

  const onGoingGoals = goals?.filter((goal) => goal.status === "ON-GOING");
  const completedGoals = goals?.filter((goal) => goal.status === "COMPLETED");

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h4 className="text-xl font-bold">나의 목표</h4>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold">{onGoingGoals?.length}</p>
          <p className="text-blue-100 text-sm">진행중</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{completedGoals?.length}</p>
          <p className="text-blue-100 text-sm">완료</p>
        </div>
      </div>

      <div className="border-t border-white/20 pt-4 grow flex items-center justify-center">
        <div className="text-center">
          <p className="text-blue-100 text-sm mb-1">전체 목표 달성률</p>
          <p className="text-2xl font-bold">
            {Math.round(
              ((completedGoals?.length ?? 0) /
                ((onGoingGoals?.length ?? 0) + (completedGoals?.length ?? 0))) *
                100
            )}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
