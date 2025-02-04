/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { TimerIcon, Wallet } from "lucide-react";
import Link from "next/link";

interface AppIconProps {
  app: {
    name: string;
    icon: React.ReactNode;
    color: string;
    url: string;
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
      <div className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-pre-line text-center">
        {app.name}
      </div>
    </motion.div>
  );
}

const apps = [
  {
    name: "갤러리\n타이머",
    icon: <TimerIcon size={36} />,
    color: "text-purple-500",
    url: "/gallery-timer",
  },
  {
    name: "커플\n가계부",
    icon: <Wallet size={36} />,
    color: "text-pink-500",
    url: "/account-book/dashboard",
  },
];

export default function Dashboard() {
  return (
    <div className="size-full justify-center transition-colors duration-300 flex flex-col items-center gap-12">
      <img
        src="/dashboard-bg.png"
        alt="배경이미지"
        className="w-[400px] h-[320px]"
      />
      <motion.div
        className="flex items-start gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {apps.map((app, index) => (
          <Link href={app.url} key={app.name}>
            <AppIcon key={app.name} app={app} index={index} />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
