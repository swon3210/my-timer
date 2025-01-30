export type Budget = {
  id: string;
  amount: number;
  categoryId: string;
  type: "INCOME" | "EXPENSE";
};
