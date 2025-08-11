import { overlay } from "overlay-kit";
import { Goal } from "@/app/api/account-books/goals/types";
import { useForm } from "react-hook-form";
import { useAddGoalsMutation } from "@/domains/account-book/goal/useAddGoalsMutation";
import { useUpdateGoalsMutation } from "@/domains/account-book/goal/useUpdateBudgetsMutation";
import useTransactionCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type GoalFormData = Omit<Goal, "id">;

interface GoalModalProps {
  isOpen: boolean;
  goal?: Goal;
  onClose: () => void;
}

export const openGoalModal = (goal?: Goal) => {
  overlay.open(({ isOpen, close }) => (
    <GoalModal isOpen={isOpen} goal={goal} onClose={close} />
  ));
};

export default function GoalModal({ isOpen, goal, onClose }: GoalModalProps) {
  const { register, handleSubmit } = useForm<GoalFormData>({
    defaultValues: goal ?? {
      categoryId: undefined,
      displayName: "",
      description: "",
      imageUrl: "",
      targetAmount: 0,
      startAt: "",
      endAt: "",
      priority: "MEDIUM",
    },
  });

  const { data: categories } = useTransactionCategoriesQuery();

  const categoryOptions =
    categories?.filter((category) => category.type === "INCOME") ?? [];

  const { mutate: addGoal, isPending: isAdding } = useAddGoalsMutation();
  const { mutate: updateGoal, isPending: isUpdating } =
    useUpdateGoalsMutation();

  const handleFormSubmit = handleSubmit((data) => {
    if (goal) {
      updateGoal({ ...data, id: goal.id });
    } else {
      addGoal(data);
    }

    onClose();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 md:p-0">
        <div className="p-6 border-b border-gray-200">
          <DialogTitle className="text-xl">
            {goal ? "목표 편집" : "새 목표 추가"}
          </DialogTitle>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4 p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 *
            </label>
            <select
              {...register("categoryId")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.displayedName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 제목 *
            </label>
            <input
              type="text"
              {...register("displayName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: 새 노트북 구매"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 금액 *
            </label>
            <input
              type="number"
              {...register("targetAmount", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작일
            </label>
            <input
              type="date"
              {...register("startAt")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              마감일
            </label>
            <input
              type="date"
              {...register("endAt")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              우선순위
            </label>
            <select
              {...register("priority")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="LOW">낮음</option>
              <option value="MEDIUM">보통</option>
              <option value="HIGH">높음</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이미지 URL
            </label>
            <input
              type="url"
              {...register("imageUrl")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="목표에 대한 상세 설명을 입력하세요"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isAdding || isUpdating ? "저장중..." : goal ? "수정" : "추가"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
