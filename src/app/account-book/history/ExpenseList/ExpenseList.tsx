"use client";

import { motion } from "framer-motion";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  Tag,
  Trash2,
  Pencil,
  PlusCircle,
} from "lucide-react";
import {
  useAccountItemsQuery,
  useSetAccountItems,
} from "@/domains/account-book/useAccountItemsQuery";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import { AccountItem } from "@/domains/account-book/types";
import dayjs from "dayjs";
import useDeleteAccountItemMutation from "@/domains/account-book/useDeleteAccountItemMutation";
import { Button } from "@/components/ui/button";
import useUpdateAccountItemMutation from "@/domains/account-book/useUpdateAccountItemMutation";
import useAddAccountItemMutation from "@/domains/account-book/useAddAccountItemsMutation";
import useExpenseFormDialogOverlay from "@/app/_components/ExpenseFormDialog/useExpenseFormDialogOverlay";
function ExpenseItem({
  accountItem,
  index,
}: {
  accountItem: AccountItem;
  index: number;
}) {
  const { data: categories } = useAccountItemCategoriesQuery();
  const { setAccountItems } = useSetAccountItems();
  const { mutateAsync: updateAccountItem } = useUpdateAccountItemMutation();
  const { mutateAsync: deleteAccountItem } = useDeleteAccountItemMutation();
  const { openExpenseFormDialog, closeExpenseFormDialog } =
    useExpenseFormDialogOverlay();

  const category = categories?.find(
    (category) => category.id === accountItem.categoryId
  );

  const handleDeleteButtonClick = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    try {
      setAccountItems((items) =>
        items.filter((item) => item.id !== accountItem.id)
      );
      await deleteAccountItem(accountItem.id);
    } catch (error) {
      setAccountItems((items) => {
        const newItems = [...items];
        newItems.splice(index, 0, accountItem);
        return newItems;
      });
      console.error(error);
    }
  };

  const handleEditButtonClick = async () => {
    try {
      const formValues = await openExpenseFormDialog({
        defaultValues: {
          ...accountItem,
          description: accountItem.description ?? "",
          date: dayjs(accountItem.date).format("YYYY-MM-DD"),
        },
      });

      const newAccountItem = {
        ...accountItem,
        ...formValues,
        type: formValues.type,
        categoryId: formValues.categoryId ?? accountItem.categoryId,
        amount: formValues.amount,
        description: formValues.description,
        date: formValues.date,
      };

      setAccountItems((items) => {
        const newItems = [...items];
        newItems.splice(index, 1, newAccountItem);
        return newItems;
      });

      await updateAccountItem(newAccountItem);

      closeExpenseFormDialog();
    } catch (error) {
      console.error(error);

      setAccountItems((items) => {
        const newItems = [...items];
        newItems.splice(index, 1, accountItem);
        return newItems;
      });
    }
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`p-2 rounded-full ${
            accountItem.amount > 0 ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {accountItem.amount > 0 ? (
            <ArrowUpCircle className="text-green-500 w-6 h-6" />
          ) : (
            <ArrowDownCircle className="text-red-500 w-6 h-6" />
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {accountItem.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="mr-2">
              {new Date(accountItem.date).toLocaleDateString()}
            </span>
            <Tag className="w-4 h-4 mr-1" />
            <span>{category ? category.displayedName : "미분류"}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p
          className={`font-bold text-lg ${
            accountItem.amount > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          ₩{Math.abs(accountItem.amount).toLocaleString()}
        </p>
        <div className="flex items-center space-x-2">
          <Button onClick={handleEditButtonClick} variant="ghost">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button onClick={handleDeleteButtonClick} variant="ghost">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function DateDivider({ date }: { date: string }) {
  const { openExpenseFormDialog, closeExpenseFormDialog } =
    useExpenseFormDialogOverlay();
  const { mutateAsync: addTransaction } = useAddAccountItemMutation();
  const { data: categories } = useAccountItemCategoriesQuery();

  const handlePlusButtonClick = async () => {
    try {
      const formValues = await openExpenseFormDialog({
        defaultValues: {
          type: "EXPENSE",
          date: dayjs(date).format("YYYY-MM-DD"),
        },
      });

      const category = categories?.find(
        (category) => category.id === formValues.categoryId
      );

      if (!category) {
        return;
      }

      await addTransaction({
        amount:
          formValues.type === "EXPENSE"
            ? -Number(formValues.amount)
            : Number(formValues.amount),
        description: formValues.description,
        categoryId: category.id,
        date: new Date(formValues.date).toISOString(),
        type: formValues.type,
        categoryDisplayedName: category.displayedName,
        frequency: formValues.frequency,
      });

      closeExpenseFormDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 pt-8 pb-4">
      <div className="w-full h-px bg-gray-200" />
      <p className="flex items-center gap-2 text-gray-500 whitespace-nowrap">
        {dayjs(date).format("YYYY년 MM월 DD일")}
        <Button
          variant="ghost"
          className="px-3"
          onClick={handlePlusButtonClick}
        >
          <PlusCircle className="w-4 h-4" />
        </Button>
      </p>
      <div className="w-full h-px bg-gray-200" />
    </div>
  );
}

export default function ExpenseList() {
  const { data: accountItems } = useAccountItemsQuery();

  if (!accountItems || accountItems.length === 0) {
    return (
      <motion.div
        className="text-center p-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl text-gray-600">거래 내역이 없습니다.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {accountItems.map((accountItem, index) => {
        if (index === 0) {
          return (
            <div key={accountItem.id}>
              <DateDivider date={accountItem.date} />
              <ExpenseItem accountItem={accountItem} index={index} />
            </div>
          );
        }

        if (
          !dayjs(accountItem.date).isSame(
            dayjs(accountItems[index - 1].date),
            "day"
          )
        ) {
          return (
            <div key={accountItem.id}>
              <DateDivider date={accountItem.date} />
              <ExpenseItem accountItem={accountItem} index={index} />
            </div>
          );
        }

        return (
          <div key={accountItem.id}>
            <ExpenseItem accountItem={accountItem} index={index} />
          </div>
        );
      })}
    </motion.div>
  );
}
