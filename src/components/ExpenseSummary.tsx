"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react";
import { useFinance } from "./FinanceContext";

interface PeriodData {
  total: { [key: string]: number };
  categories: { [key: string]: { income: number; expense: number } };
}

interface Summary {
  daily: PeriodData;
  weekly: PeriodData;
  monthly: PeriodData;
}

export default function ExpenseSummary({
  timeFrame,
}: {
  timeFrame: keyof Summary;
}) {
  const { transactions, categories } = useFinance();

  const summary = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        daily: { total: {}, categories: {} },
        weekly: { total: {}, categories: {} },
        monthly: { total: {}, categories: {} },
      } as Summary;
    }

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return transactions.reduce<Summary>(
      (acc, transaction) => {
        const transactionDate = new Date(transaction.date);
        const category = categories.find((c) => c.id === transaction.category);

        if (!category) return acc;

        const updatePeriod = (period: keyof Summary) => {
          if (!acc[period].total[category.type]) {
            acc[period].total[category.type] = 0;
          }
          if (!acc[period].categories[category.id]) {
            acc[period].categories[category.id] = { income: 0, expense: 0 };
          }

          acc[period].total[category.type] += transaction.amount;
          if (transaction.amount > 0) {
            acc[period].categories[category.id].income += transaction.amount;
          } else {
            acc[period].categories[category.id].expense += Math.abs(
              transaction.amount
            );
          }
        };

        if (transactionDate >= startOfDay) {
          updatePeriod("daily");
        }
        if (transactionDate >= startOfWeek) {
          updatePeriod("weekly");
        }
        if (transactionDate >= startOfMonth) {
          updatePeriod("monthly");
        }

        return acc;
      },
      {
        daily: { total: {}, categories: {} },
        weekly: { total: {}, categories: {} },
        monthly: { total: {}, categories: {} },
      }
    );
  }, [transactions, categories]);

  if (Object.keys(summary[timeFrame].total).length === 0) {
    return (
      <motion.div
        className="text-center p-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl text-gray-600">
          선택한 기간에 대한 거래 내역이 없습니다.
        </p>
      </motion.div>
    );
  }

  const totalIncome = summary[timeFrame].total.income || 0;
  const totalExpense = Math.abs(summary[timeFrame].total.expense || 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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

      <div className="bg-white rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  카테고리
                </th>
                <th scope="col" className="px-6 py-3">
                  수입
                </th>
                <th scope="col" className="px-6 py-3">
                  지출
                </th>
                <th scope="col" className="px-6 py-3">
                  잔액
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary[timeFrame].categories).map(
                ([categoryId, data], index) => {
                  const category = categories.find((c) => c.id === categoryId);
                  if (!category) return null;
                  const balance = data.income - data.expense;
                  return (
                    <motion.tr
                      key={categoryId}
                      className="bg-white border-b"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {category.name}
                      </th>
                      <td className="px-6 py-4 text-green-500">
                        +₩{data.income.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-red-500">
                        -₩{data.expense.toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-4 ${
                          balance >= 0 ? "text-blue-500" : "text-red-500"
                        }`}
                      >
                        ₩{balance.toLocaleString()}
                      </td>
                    </motion.tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
