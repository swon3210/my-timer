"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  date: string;
  amount: number;
}

interface ExpenseChartProps {
  transactions: Transaction[];
  timeFrame: "daily" | "weekly" | "monthly";
}

interface GroupedData {
  [key: string]: { income: number; expense: number };
}

export default function ExpenseChart({
  transactions,
  timeFrame,
}: ExpenseChartProps) {
  const chartData = useMemo(() => {
    const groupedData = transactions.reduce<GroupedData>((acc, transaction) => {
      const date = new Date(transaction.date);
      let key;

      if (timeFrame === "daily") {
        key = date.toISOString().split("T")[0];
      } else if (timeFrame === "weekly") {
        const weekNumber = Math.ceil((date.getDate() - 1 - date.getDay()) / 7);
        key = `Week ${weekNumber + 1}`;
      } else {
        key = date.toLocaleString("default", { month: "short" });
      }

      if (!acc[key]) {
        acc[key] = { income: 0, expense: 0 };
      }

      if (transaction.amount > 0) {
        acc[key].income += transaction.amount;
      } else {
        acc[key].expense += Math.abs(transaction.amount);
      }

      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, data]) => ({
      date,
      income: data.income,
      expense: data.expense,
    }));
  }, [transactions, timeFrame]);

  return (
    <motion.div
      className="w-full h-64 md:h-96"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4ade80" name="수입" />
          <Bar dataKey="expense" fill="#f87171" name="지출" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
