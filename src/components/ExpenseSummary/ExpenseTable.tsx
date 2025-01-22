import {
  AccountItem,
  EXPENSE_CATEGORY_KR,
  INCOME_CATEGORY_KR,
} from "@/domains/account-book/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ExpenseTableProps = {
  accountItems: AccountItem[];
};

function ExpenseTableItem({
  accountItem,
  balance,
  index,
}: {
  accountItem: AccountItem;
  balance: number;
  index: number;
}) {
  const amount = accountItem.amount.toLocaleString();

  return (
    <motion.tr
      key={accountItem.id}
      className="bg-white border-b"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {accountItem.categoryDisplayedName}
      </th>
      <td
        className={cn(
          "px-6 py-4",
          accountItem.type === "INCOME" && "text-green-500"
        )}
      >
        {accountItem.type === "INCOME" ? `${amount} 원` : `-`}
      </td>
      <td
        className={cn(
          "px-6 py-4",
          accountItem.type === "EXPENSE" && "text-red-500"
        )}
      >
        {accountItem.type === "EXPENSE" ? `${amount} 원` : `-`}
      </td>
      <td className={`px-6 py-4 text-blue-500`}>{`${balance} 원`}</td>
    </motion.tr>
  );
}

export default function ExpenseTable({ accountItems }: ExpenseTableProps) {
  return (
    <div className="bg-white rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                카테고리
              </th>
              <th scope="col" className="px-6 py-3">
                수입
              </th>
              <th scope="col" className="px-6 py-3">
                지출
              </th>
              <th scope="col" className="px-6 py-3">
                잔액
              </th>
            </tr>
          </thead>
          <tbody>
            {accountItems.map((accountItem, index) => (
              <ExpenseTableItem
                accountItem={accountItem}
                index={index}
                key={accountItem.id}
                balance={0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
