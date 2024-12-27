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

export default function Home() {
  const [timeFrame, setTimeFrame] = useState("monthly");

  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">
              스마트 가계부
            </h1>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8 bg-indigo-100 p-1 rounded-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800"
                >
                  <PieChart className="w-5 h-5 mr-2" />
                  개요
                </TabsTrigger>
                <TabsTrigger
                  value="add"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  추가
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800"
                >
                  <List className="w-5 h-5 mr-2" />
                  목록
                </TabsTrigger>
                <TabsTrigger
                  value="categories"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  카테고리
                </TabsTrigger>
                <TabsTrigger
                  value="budget"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800"
                >
                  <BarChart className="w-5 h-5 mr-2" />
                  예산
                </TabsTrigger>
                <TabsTrigger
                  value="comparison"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  비교
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4">
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
                  <ExpenseSummary timeFrame={timeFrame} />
                </motion.div>
              </TabsContent>

              <TabsContent value="add">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ExpenseForm />
                </motion.div>
              </TabsContent>

              <TabsContent value="list">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ExpenseList />
                </motion.div>
              </TabsContent>

              <TabsContent value="categories">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CategoryManager />
                </motion.div>
              </TabsContent>

              <TabsContent value="budget">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BudgetManager />
                </motion.div>
              </TabsContent>

              <TabsContent value="comparison">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <WeeklyBudgetComparison />
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </FinanceProvider>
  );
}
