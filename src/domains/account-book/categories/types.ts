import { TransactionType } from "../transactions/types";

// TODO : 추후 확장하기
export type CategoryIcon =
  | "dollar-sign"
  | "shopping-bag"
  | "factory"
  | "more-horizontal"
  | string;

export type Category = {
  id: string;
  displayedName: string;
  type: TransactionType;
  icon?: CategoryIcon;
  createdAt: string;
  updatedAt: string;
};
