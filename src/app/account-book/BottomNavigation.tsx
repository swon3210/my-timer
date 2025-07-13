"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, BarChart3, FileText, Tag, Plus } from "lucide-react";
import Link from "next/link";

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
    id: "transactions",
    icon: FileText,
    label: "거래내역",
    href: "/account-book/transactions",
  },
  {
    id: "category",
    icon: Tag,
    label: "카테고리",
    href: "/account-book/category",
  },
];

export const BOTTOM_NAVIGATION_HEIGHT = 76;

function NavButton({ item, onClick }: { item: NavItem; onClick: () => void }) {
  return (
    <Link
      href={item.href}
      className="bg-white rounded-full p-2 shadow-md mb-2"
      onClick={onClick}
    >
      <item.icon size={20} className="text-primary" />
    </Link>
  );
}

export default function BottomNavigation() {
  const [isFabOpen, setIsFabOpen] = useState(false);

  const handleFabToggle = () => {
    setIsFabOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <motion.div
        className={`flex flex-col items-center mt-2 ${
          isFabOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isFabOpen ? 1 : 0, scale: isFabOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            onClick={() => setIsFabOpen(false)}
          />
        ))}
      </motion.div>

      <motion.button
        className="bg-primary rounded-full p-3 shadow-lg"
        onClick={handleFabToggle}
      >
        <Plus className="text-white" size={24} />
      </motion.button>
    </div>
  );
}
