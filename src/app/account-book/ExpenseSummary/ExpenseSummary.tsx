"use client";

import { motion } from "framer-motion";
import { useAccountItemsSuspenseQuery } from "@/domains/account-book/useAccountItemsQuery";
import { Suspense } from "react";
import ExpenseTotal from "./ExpenseTotal";
import ExpenseTable from "./ExpenseTable";

function ExpenseSummaryContent() {
  const { data: accountItems } = useAccountItemsSuspenseQuery();

  if (accountItems.length === 0) {
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

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ExpenseTotal accountItems={accountItems} />
      <ExpenseTable accountItems={accountItems} />
    </motion.div>
  );
}

export default function ExpenseSummary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExpenseSummaryContent />
    </Suspense>
  );
}
