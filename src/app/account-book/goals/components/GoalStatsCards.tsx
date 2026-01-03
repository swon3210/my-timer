import { Goal } from "@/domains/account-book/goal/types";
import { StatCard } from "@/components/ui/stat-card";
import { Target, TrendingUp, BarChart3 } from "lucide-react";

interface GoalStatsCardsProps {
  goals: Goal[];
}

export default function GoalStatsCards({ goals }: GoalStatsCardsProps) {
  const inProgressGoals = goals.filter((goal) => goal.status === "ON-GOING");
  const completedGoals = goals.filter((goal) => goal.status === "COMPLETED");
  const achievementRate = goals.length > 0 
    ? Math.round((completedGoals.length / goals.length) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        variant="info"
        icon={<Target className="h-5 w-5" />}
        label="진행중"
        value={`${inProgressGoals.length}개`}
      />

      <StatCard
        variant="success"
        icon={<TrendingUp className="h-5 w-5" />}
        label="완료"
        value={`${completedGoals.length}개`}
      />

      <StatCard
        variant="warning"
        icon={<BarChart3 className="h-5 w-5" />}
        label="달성률"
        value={`${achievementRate}%`}
      />
    </div>
  );
}
