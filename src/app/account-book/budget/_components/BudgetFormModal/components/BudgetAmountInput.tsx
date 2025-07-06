import { BudgetAmountInputProps } from "../types";

export const BudgetAmountInput = ({
  register,
  error,
}: BudgetAmountInputProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        예산 금액 *
      </label>
      <input
        type="number"
        {...register("amount", {
          required: "예산 금액을 입력해주세요",
          min: {
            value: 1,
            message: "예산 금액은 1원 이상이어야 합니다",
          },
          valueAsNumber: true,
        })}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="예산 금액을 입력하세요"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
};
