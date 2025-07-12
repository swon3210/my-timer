import { CATEGORY_COLORS, PERIOD_LABELS } from "./constants";
import { CategoryOption } from "./types";

export const generateDefaultTitle = (
  period: "weekly" | "monthly" | "yearly",
  selectedYear: number,
  selectedMonth?: number
): string => {
  const periodText = PERIOD_LABELS[period];
  const titleSuffix =
    period === "monthly" && selectedMonth !== undefined
      ? `${selectedYear}년 ${selectedMonth + 1}월`
      : `${selectedYear}년`;

  return `${periodText} 예산 (${titleSuffix})`;
};

export const calculateDateRange = (
  period: "weekly" | "monthly" | "yearly",
  selectedYear: number,
  selectedMonth?: number
): { startDate: Date; endDate: Date } => {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  if (period === "monthly") {
    const targetMonth =
      selectedMonth !== undefined ? selectedMonth : now.getMonth();
    startDate = new Date(selectedYear, targetMonth, 1);
    endDate = new Date(selectedYear, targetMonth + 1, 0);
  } else if (period === "yearly") {
    startDate = new Date(selectedYear, 0, 1);
    endDate = new Date(selectedYear, 11, 31);
  } else {
    // weekly
    startDate = new Date(selectedYear, now.getMonth(), now.getDate());
    endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  return { startDate, endDate };
};

export const mapCategoriesToOptions = (
  categories: Array<{ id: string; displayedName: string; type: string }>
): CategoryOption[] => {
  return categories
    .filter((cat) => cat.type === "EXPENSE")
    .map((category, index) => ({
      id: category.id,
      name: category.displayedName,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }));
};

export const findCategoryById = (
  categories: CategoryOption[],
  categoryId: string
): CategoryOption | undefined => {
  return categories.find((cat) => cat.id === categoryId);
};
