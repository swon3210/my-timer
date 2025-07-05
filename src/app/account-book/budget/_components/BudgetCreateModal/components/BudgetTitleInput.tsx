import { BudgetTitleInputProps } from "../types";

export const BudgetTitleInput = ({
  register,
  error,
}: BudgetTitleInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        예산 제목 *
      </label>
      <input
        type="text"
        {...register("title", {
          required: "예산 제목을 입력해주세요",
          minLength: {
            value: 2,
            message: "제목은 최소 2자 이상 입력해주세요",
          },
        })}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="예산 제목을 입력하세요"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
};
