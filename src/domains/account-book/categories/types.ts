import { TransactionType } from "../types";

export type CategoryIcon =
  | "dollar-sign"
  | "shopping-bag"
  | "factory"
  | "more-horizontal";

export type Category = {
  id: string;
  displayedName: string;
  type: TransactionType;
  icon?: CategoryIcon;
  createdAt: string;
  updatedAt: string;
};

// 기본 카테고리 상수 정의
export const DEFAULT_EXPENSE_CATEGORIES = [
  "FOOD",
  "TRANSPORTATION",
  "HOUSING_COMMUNICATION",
  "DAILY_NECESSITIES",
  "HEALTHCARE",
  "ENTERTAINMENT",
  "EDUCATION",
  "OTHER_EXPENSE",
] as const;

export const DEFAULT_INCOME_CATEGORIES = [
  "SALARY",
  "ALLOWANCE",
  "BONUS",
  "INVESTMENT",
  "OTHER_INCOME",
] as const;

// 카테고리 한글 매핑
export const EXPENSE_CATEGORY_KR: Record<
  (typeof DEFAULT_EXPENSE_CATEGORIES)[number],
  string
> = {
  FOOD: "식비",
  TRANSPORTATION: "교통",
  HOUSING_COMMUNICATION: "주거/통신",
  DAILY_NECESSITIES: "생활용품",
  HEALTHCARE: "의료/건강",
  ENTERTAINMENT: "문화/여가",
  EDUCATION: "교육",
  OTHER_EXPENSE: "기타",
} as const;

export const INCOME_CATEGORY_KR: Record<
  (typeof DEFAULT_INCOME_CATEGORIES)[number],
  string
> = {
  SALARY: "급여",
  ALLOWANCE: "용돈",
  BONUS: "상여금",
  INVESTMENT: "투자수익",
  OTHER_INCOME: "기타수입",
} as const;

// 카테고리 타입 정의
export type ExpenseCategory = (typeof DEFAULT_EXPENSE_CATEGORIES)[number];
export type IncomeCategory = (typeof DEFAULT_INCOME_CATEGORIES)[number];
