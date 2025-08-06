import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Tracker - 출퇴근 관리",
  description: "출퇴근 시간을 기록하고 근무 시간을 관리하세요",
};

export default function JobTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
