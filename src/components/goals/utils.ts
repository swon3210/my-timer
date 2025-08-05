import { Goal, Priority, GoalFormData } from "@/types/goal";

export function filterAndSortGoals(
  goals: Goal[],
  filterPriority: Priority | "all",
  sortBy: "dueDate" | "priority" | "progress"
): Goal[] {
  return goals
    .filter(
      (goal) => filterPriority === "all" || goal.priority === filterPriority
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });
}

export function createNewGoal(goalData: GoalFormData): Goal {
  return {
    id: Date.now(),
    ...goalData,
    current: 0,
    progress: 0,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };
}

export function updateGoal(existingGoal: Goal, goalData: GoalFormData): Goal {
  return {
    ...existingGoal,
    ...goalData,
    updatedAt: new Date().toISOString().split("T")[0],
  };
}
