import { BudgetAmountInputProps } from "../types";

export const BudgetAmountInput = ({
  value,
  onChange,
  error,
}: BudgetAmountInputProps) => {
  const handleAmountChange = (inputValue: string) => {
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const numberValue = parseInt(numericValue) || 0;
    onChange(numberValue);
  };

  const formatAmount = (amount: number): string => {
    return amount.toLocaleString();
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        예산 금액
      </label>
      <input
        type="text"
        value={value > 0 ? formatAmount(value) : ""}
        onChange={(e) => handleAmountChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="예산 금액을 입력하세요"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {value > 0 && (
        <p className="text-sm text-gray-500 mt-1">{formatAmount(value)}원</p>
      )}
    </div>
  );
};
