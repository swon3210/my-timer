"use client";

import { motion } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, Calendar, Tag } from "lucide-react";
import { useFinance } from "../../../../components/FinanceContext";

export default function ExpenseList() {
  const { transactions, categories } = useFinance();

  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        className="text-center p-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl text-gray-600">거래 내역이 없습니다.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {transactions.map((transaction, index) => {
        const category = categories.find(
          (cat) => cat.id === transaction.category
        );
        return (
          <motion.div
            key={transaction.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full ${
                  transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {transaction.amount > 0 ? (
                  <ArrowUpCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <ArrowDownCircle className="text-red-500 w-6 h-6" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {transaction.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-2">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <Tag className="w-4 h-4 mr-1" />
                  <span>{category ? category.name : "미분류"}</span>
                </div>
              </div>
            </div>
            <p
              className={`font-bold text-lg ${
                transaction.amount > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {transaction.amount > 0 ? "+" : "-"}₩
              {Math.abs(transaction.amount).toLocaleString()}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
