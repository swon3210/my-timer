/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { TimerIcon, Wallet } from "lucide-react";

interface AppIconProps {
  app: {
    name: string;
    icon: React.ReactNode;
    color: string;
  };
  index: number;
}

function AppIcon({ app, index }: AppIconProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className={`text-5xl mb-2 ${app.color}`}>{app.icon}</div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {app.name}
      </div>
    </motion.div>
  );
}

const apps = [
  { name: "가계부", icon: <Wallet size={32} />, color: "text-pink-500" },
  {
    name: "갤러리 타이머",
    icon: <TimerIcon size={32} />,
    color: "text-purple-500",
  },
];

export default function Dashboard() {
  return (
    <div className="size-full">
      <div className="size-full transition-colors duration-300 flex flex-col items-center gap-12">
        <img
          src="/dashboard-bg.png"
          alt="배경이미지"
          className="h-96 w-96 object-cover object-bottom"
        />
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {apps.map((app, index) => (
            <AppIcon key={app.name} app={app} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
