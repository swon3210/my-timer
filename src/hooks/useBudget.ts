import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBudget,
  getBudgetsByPeriod,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetStatus,
  calculateBudgetStatus,
  CreateBudgetRequest,
  UpdateBudgetRequest,
  BudgetPeriodFilter,
} from "@/services/budgetService";
import { Budget, BudgetStatus } from "@/types/budget";
// Note: Replace with your preferred toast library or remove toast notifications

// Query keys
export const budgetKeys = {
  all: ["budgets"] as const,
  byPeriod: (filter: BudgetPeriodFilter) =>
    ["budgets", "period", filter] as const,
  byId: (id: string) => ["budgets", id] as const,
  status: (id: string) => ["budgets", id, "status"] as const,
};

// 기간별 예산 조회
export const useBudgetsByPeriod = (filter: BudgetPeriodFilter) => {
  return useQuery({
    queryKey: budgetKeys.byPeriod(filter),
    queryFn: () => getBudgetsByPeriod(filter),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 특정 예산 조회
export const useBudgetById = (budgetId: string) => {
  return useQuery({
    queryKey: budgetKeys.byId(budgetId),
    queryFn: () => getBudgetById(budgetId),
    enabled: !!budgetId,
  });
};

// 예산 상태 조회
export const useBudgetStatus = (budget: Budget | null) => {
  return useQuery({
    queryKey: budget
      ? budgetKeys.status(budget.id)
      : ["budgets", "status", "null"],
    queryFn: () => (budget ? calculateBudgetStatus(budget) : null),
    enabled: !!budget,
    staleTime: 1000 * 60 * 2, // 2분
  });
};

// 예산 생성
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudget,
    onSuccess: (data) => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
      console.log("예산이 성공적으로 생성되었습니다.");
    },
    onError: (error) => {
      console.error("예산 생성 실패:", error);
    },
  });
};

// 예산 수정
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBudget,
    onSuccess: (data) => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
      queryClient.invalidateQueries({ queryKey: budgetKeys.byId(data.id) });
      queryClient.invalidateQueries({ queryKey: budgetKeys.status(data.id) });
      console.log("예산이 성공적으로 수정되었습니다.");
    },
    onError: (error) => {
      console.error("예산 수정 실패:", error);
    },
  });
};

// 예산 삭제
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
      console.log("예산이 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("예산 삭제 실패:", error);
    },
  });
};
