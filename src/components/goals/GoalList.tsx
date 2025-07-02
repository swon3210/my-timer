import { Goal } from "@/app/api/account-books/goals/types";
import GoalCard from "./GoalCard";
import { useGoalsQuery } from "@/domains/account-book/goal/useGoalsQuery";
import { openGoalModal } from "./GoalModal";
import { useDeleteGoalsMutation } from "@/domains/account-book/goal/useDeleteGoalsMutation";
import { toast } from "sonner";

export default function GoalList() {
  const { data: goals } = useGoalsQuery();

  const { mutateAsync: deleteGoal } = useDeleteGoalsMutation();

  const handleEdit = (goal: Goal) => {
    openGoalModal(goal);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGoal(id);
      toast.success("목표가 삭제되었습니다.");
    } catch (error) {
      toast.error("목표 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  if (goals?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
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
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          해당하는 목표가 없습니다
        </h3>
        <p className="text-gray-600 mb-6">
          필터 조건을 변경하거나 새 목표를 추가해보세요
        </p>
        <button
          onClick={() => openGoalModal()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          새 목표 추가
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals?.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
