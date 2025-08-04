import { axiosInstance } from "@/lib/api";
import { Budget, BudgetStatus, CategoryStatus } from "@/types/budget";

export interface CreateBudgetRequest {
  title: string;
  amount: number;
  period: "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
  categories: {
    categoryId: string;
    categoryName: string;
    allocatedAmount: number;
    color: string;
  }[];
}

export interface UpdateBudgetRequest extends CreateBudgetRequest {
  id: string;
}

export interface BudgetPeriodFilter {
  period: "weekly" | "monthly" | "yearly";
  year: number;
  month?: number; // 월간 예산의 경우만 사용
}

// 예산 생성
export const createBudget = async (
  budgetData: CreateBudgetRequest
): Promise<Budget> => {
  const response = await axiosInstance.post("/api/budgets", budgetData);
  return response.data;
};

// 예산 조회 (기간별)
export const getBudgetsByPeriod = async (
  filter: BudgetPeriodFilter
): Promise<Budget[]> => {
  const response = await axiosInstance.get("/api/budgets", {
    params: filter,
  });
  return response.data;
};

// 특정 예산 조회
export const getBudgetById = async (budgetId: string): Promise<Budget> => {
  const response = await axiosInstance.get(`/api/budgets/${budgetId}`);
  return response.data;
};

// 예산 수정
export const updateBudget = async (
  budgetData: UpdateBudgetRequest
): Promise<Budget> => {
  const response = await axiosInstance.put(
    `/api/budgets/${budgetData.id}`,
    budgetData
  );
  return response.data;
};

// 예산 삭제
export const deleteBudget = async (budgetId: string): Promise<void> => {
  await axiosInstance.delete(`/api/budgets/${budgetId}`);
};

// 예산 상태 조회 (예산 대비 지출 계산)
export const getBudgetStatus = async (
  budgetId: string
): Promise<BudgetStatus> => {
  const response = await axiosInstance.get(`/api/budgets/${budgetId}/status`);
  return response.data;
};

// 카테고리별 지출 계산
export const calculateCategorySpending = async (
  categoryId: string,
  startDate: Date,
  endDate: Date
): Promise<number> => {
  const response = await axiosInstance.get(
    "/api/transactions/category-spending",
    {
      params: {
        categoryId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    }
  );
  return response.data.totalSpent || 0;
};

// 전체 지출 계산
export const calculateTotalSpending = async (
  startDate: Date,
  endDate: Date
): Promise<number> => {
  const response = await axiosInstance.get("/api/transactions/total-spending", {
    params: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
  });
  return response.data.totalSpent || 0;
};

// 예산 상태 계산 (클라이언트 사이드)
export const calculateBudgetStatus = async (
  budget: Budget
): Promise<BudgetStatus> => {
  const totalSpent = await calculateTotalSpending(
    budget.startDate,
    budget.endDate
  );
  const remainingBudget = budget.amount - totalSpent;
  const progressPercentage = (totalSpent / budget.amount) * 100;
  const isOverBudget = totalSpent > budget.amount;

  const categories: CategoryStatus[] = await Promise.all(
    budget.categories.map(async (category) => {
      const spent = await calculateCategorySpending(
        category.categoryId,
        budget.startDate,
        budget.endDate
      );
      const remaining = category.allocatedAmount - spent;
      const percentage = (spent / category.allocatedAmount) * 100;

      return {
        id: category.id,
        name: category.categoryName,
        allocated: category.allocatedAmount,
        spent,
        remaining,
        percentage,
        isOverBudget: spent > category.allocatedAmount,
        color: category.color,
      };
    })
  );

  return {
    totalBudget: budget.amount,
    totalSpent,
    remainingBudget,
    progressPercentage,
    isOverBudget,
    categories,
  };
};
