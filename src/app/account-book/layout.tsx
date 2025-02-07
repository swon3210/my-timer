"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChart, List, PieChart, Settings } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OverlayProvider from "@/providers/OverlayProvider";

// export const metadata = {
//   title: "가계부",
//   description: "가계부 페이지",
// };

export default function AccountBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getCurrentTab = () => {
    if (pathname.includes("/dashboard")) {
      return "dashboard";
    }

    if (pathname.includes("/budget")) {
      return "budget";
    }

    if (pathname.includes("/analyze")) {
      return "analyze";
    }

    if (pathname.includes("/history")) {
      return "history";
    }

    if (pathname.includes("/category")) {
      return "category";
    }

    return "overview";
  };

  return (
    <main className="size-full bg-gray-50">
      <div className="size-full max-w-app-container mx-auto flex flex-col">
        <div className={cn("flex flex-col h-full")}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full bg-white md:rounded-md overflow-auto"
          >
            <Tabs value={getCurrentTab()} className="w-full">
              <TabsList className="flex items-center space-x-8 w-full bg-orange-200">
                <Link href="/account-book/dashboard">
                  <TabsTrigger
                    value="dashboard"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
                  >
                    <PieChart className="w-5 h-5 mr-2 md:block hidden" />
                    개요
                  </TabsTrigger>
                </Link>
                <Link href="/account-book/history">
                  <TabsTrigger
                    value="history"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
                  >
                    <List className="w-5 h-5 mr-2 md:block hidden" />
                    내역
                  </TabsTrigger>
                </Link>
                <Link href="/account-book/budget">
                  <TabsTrigger
                    value="budget"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
                  >
                    <BarChart className="w-5 h-5 mr-2 md:block hidden" />
                    예산
                  </TabsTrigger>
                </Link>
                <Link href="/account-book/category">
                  <TabsTrigger
                    value="category"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
                  >
                    <Settings className="w-5 h-5 mr-2 md:block hidden" />
                    카테고리
                  </TabsTrigger>
                </Link>

                {/* <Link href="/account-book/analyze">
                    <TabsTrigger
                      value="analyze"
                      className="data-[state=active]:bg-white data-[state=active]:text-primary text-gray-600"
                    >
                      <TrendingUp className="w-5 h-5 mr-2 md:block hidden" />
                      비교
                    </TabsTrigger>
                  </Link> */}
              </TabsList>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <OverlayProvider>{children}</OverlayProvider>
              </motion.div>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
