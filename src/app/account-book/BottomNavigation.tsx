"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, BarChart3, FileText, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    icon: Home,
    label: "홈",
    href: "/account-book/home",
  },
  {
    id: "summary",
    icon: BarChart3,
    label: "대시보드",
    href: "/account-book/dashboard",
  },
  {
    id: "history",
    icon: FileText,
    label: "내역",
    href: "/account-book/history",
  },
];

export const BOTTOM_NAVIGATION_HEIGHT = 76;

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(() => {
    const currentNav = navItems.find((item) => pathname.includes(item.id));
    return currentNav?.id || "dashboard";
  });

  const handleNavigation = (item: NavItem) => {
    setActiveTab(item.id);
    router.push(item.href);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 max-w-app-container mx-auto safe-area-pb"
      style={{ height: BOTTOM_NAVIGATION_HEIGHT }}
    >
      <motion.nav className="relative bg-green-50 shadow-lg shadow-primary/20 rounded-t-3xl">
        {/* Navigation items */}
        <div className="relative flex items-center justify-around px-4 py-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="relative flex flex-col items-center justify-center min-w-[60px] py-2 px-3"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary/20 rounded-xl"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                {/* Icon container */}
                <motion.div
                  className={`relative flex items-center justify-center transition-colors w-8 h-8 mb-1 ${
                    isActive ? "text-primary" : "text-primary/70"
                  }`}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <Icon size={22} className="drop-shadow-sm" />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
