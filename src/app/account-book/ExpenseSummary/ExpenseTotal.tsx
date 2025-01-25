import { ArrowDownCircle, ArrowUpCircle, TrendingUp } from "lucide-react";

export default function ExpenseTotal() {
  const totalIncome = 0;
  const totalExpense = 0;
  const totalBalance = 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-green-800 mb-2 flex items-center">
          <ArrowUpCircle className="mr-2" /> 총 수입
        </h3>
        <p className="text-xl font-bold text-green-600">
          ₩ {totalIncome.toLocaleString()}
        </p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-red-800 mb-2 flex items-center">
          <ArrowDownCircle className="mr-2" /> 총 지출
        </h3>
        <p className="text-xl font-bold text-red-600">
          ₩ {totalExpense.toLocaleString()}
        </p>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-blue-800 mb-2 flex items-center">
          <TrendingUp className="mr-2" /> 잔액
        </h3>
        <p
          className={`text-xl font-bold ${
            totalBalance >= 0 ? "text-blue-600" : "text-red-600"
          }`}
        >
          ₩ {totalBalance.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
