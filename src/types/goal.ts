export type Priority = "high" | "medium" | "low";

export interface Goal {
  id: number;
  title: string;
  target: number; // 목표 금액
  current: number; // 현재 금액
  progress: number; // 달성률 (%)
  category: string;
  dueDate: string;
  priority: Priority;
  image?: string; // 목표 이미지 URL (선택적)
  description?: string; // 목표 설명 (선택적)
  createdAt: string;
  updatedAt: string;
}

export interface GoalFormData {
  title: string;
  target: number;
  category: string;
  dueDate: string;
  priority: Priority;
  image?: string;
  description?: string;
}

export interface GoalStats {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  averageProgress: number;
  totalTargetAmount: number;
  totalCurrentAmount: number;
}
