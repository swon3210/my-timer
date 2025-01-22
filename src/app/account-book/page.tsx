"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseForm from "../../components/ExpenseForm";
import ExpenseSummary from "../../components/ExpenseSummary";
import ExpenseList from "../../components/ExpenseList";
import CategoryManager from "../../components/CategoryManager";
import BudgetManager from "../../components/BudgetManager";
import WeeklyBudgetComparison from "../../components/WeeklyBudgetComparison";
import {
  PieChart,
  BarChart,
  Wallet,
  List,
  Settings,
  TrendingUp,
} from "lucide-react";
import { FinanceProvider } from "@/components/FinanceContext";
import { cn } from "@/lib/utils";

export default function Home() {
  const [timeFrame, setTimeFrame] = useState("monthly");

  return (
    <FinanceProvider>
      <div className={cn("flex flex-col h-full")}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full bg-white md:rounded-md overflow-auto"
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-orange-200">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
              >
                <PieChart className="w-5 h-5 mr-2 md:block hidden" />
                개요
              </TabsTrigger>
              <TabsTrigger
                value="add"
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
              >
                <Wallet className="w-5 h-5 mr-2 md:block hidden" />
                추가
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
              >
                <List className="w-5 h-5 mr-2 md:block hidden" />
                내역
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
              >
                <Settings className="w-5 h-5 mr-2 md:block hidden" />
                카테고리
              </TabsTrigger>
              <TabsTrigger
                value="budget"
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
              >
                <BarChart className="w-5 h-5 mr-2 md:block hidden" />
                예산
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
              >
                <TrendingUp className="w-5 h-5 mr-2 md:block hidden" />
                비교
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5">
                  <select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    className="w-full p-2 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="daily">일별</option>
                    <option value="weekly">주별</option>
                    <option value="monthly">월별</option>
                  </select>
                </div>
                <ExpenseSummary />
              </motion.div>
            </TabsContent>

            <TabsContent value="add" className="p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ExpenseForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="list" className="p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ExpenseList />
              </motion.div>
            </TabsContent>

            <TabsContent value="categories" className="p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CategoryManager />
              </motion.div>
            </TabsContent>

            <TabsContent value="budget" className="p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BudgetManager />
              </motion.div>
            </TabsContent>

            <TabsContent value="comparison" className="p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WeeklyBudgetComparison />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </FinanceProvider>
  );
}
