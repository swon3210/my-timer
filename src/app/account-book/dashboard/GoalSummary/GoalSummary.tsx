"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";

function GoalSummaryContent() {
  return (
    <motion.div
      className="space-y-6 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      test
      {/* <ExpenseTable /> */}
    </motion.div>
  );
}

export default function GoalSummary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoalSummaryContent />
    </Suspense>
  );
}
