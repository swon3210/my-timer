"use client";

import { FinanceProvider } from "@/components/FinanceContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BarChart,
  List,
  PieChart,
  Settings,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// export const metadata = {
//   title: "가계부",
//   description: "가계부 페이지",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <main className="size-full bg-gray-50">
      <div className="size-full max-w-app-container mx-auto flex flex-col">
        <FinanceProvider>
          <div className={cn("flex flex-col h-full")}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full bg-white md:rounded-md overflow-auto"
            >
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
              >
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

                <TabsContent value={selectedTab} className="p-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {children}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </FinanceProvider>
      </div>
    </main>
  );
}
