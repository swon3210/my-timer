import { TransactionFormData } from "@/types/transaction";
import { useFormContext } from "react-hook-form";

export default function TransactionTypeSelector() {
  const { reset, watch, getValues } = useFormContext<TransactionFormData>();

  const type = watch("type");

  const handleTypeChange = (newType: "INCOME" | "EXPENSE") => {
    if (newType === type) {
      return;
    }

    reset(
      newType === "EXPENSE"
        ? {
            ...getValues(),
            type: newType,
            categoryId: undefined,
            paymentMethod: undefined,
          }
        : {
            ...getValues(),
            type: newType,
            categoryId: undefined,
            paymentMethod: undefined,
          }
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        유형
      </label>
      <div className="flex space-x-2">
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            type === "INCOME"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleTypeChange("INCOME")}
        >
          수입
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            type === "EXPENSE"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleTypeChange("EXPENSE")}
        >
          지출
        </button>
      </div>
    </div>
  );
}
