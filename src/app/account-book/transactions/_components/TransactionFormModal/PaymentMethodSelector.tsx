import { TransactionPaymentMethod } from "@/app/api/account-books/transactions/types";
import { TransactionFormData } from "@/types/transaction";
import { useFormContext } from "react-hook-form";

const paymentMethodOptions: Array<{
  value: TransactionPaymentMethod;
  label: string;
}> = [
  {
    value: "CASH",
    label: "현금",
  },
  {
    value: "CREDIT_CARD",
    label: "신용카드",
  },
  {
    value: "DEBIT_CARD",
    label: "체크카드",
  },
  {
    value: "TRANSFER",
    label: "계좌이체",
  },
];

export default function PaymentMethodSelector() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TransactionFormData>();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        결제 수단
      </label>
      <select
        {...register("paymentMethod")}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors.paymentMethod ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">선택하세요</option>
        {paymentMethodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.paymentMethod && (
        <p className="text-red-500 text-sm mt-1">
          {errors.paymentMethod.message || "결제 수단을 선택해주세요"}
        </p>
      )}
    </div>
  );
}
