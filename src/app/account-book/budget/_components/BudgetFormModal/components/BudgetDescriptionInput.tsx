import { BudgetDescriptionInputProps } from "../types";

export const BudgetDescriptionInput = ({
  register,
  error,
}: BudgetDescriptionInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        설명
      </label>
      <textarea
        {...register("description")}
        rows={3}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="예산에 대한 설명을 입력하세요 (선택사항)"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
};
