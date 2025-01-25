"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, MinusCircle, Calendar } from "lucide-react";
import { useFinance } from "../../../../components/FinanceContext";
import useAddAccountItemMutation from "@/domains/account-book/useAddAccountItemsMutation";
import { useForm } from "react-hook-form";
import { AccountItem } from "@/domains/account-book/types";

export default function ExpenseForm() {
  const { categories } = useFinance();
  const { register, handleSubmit, watch, setValue } = useForm<AccountItem>({
    defaultValues: {
      type: "EXPENSE",
      categoryId: undefined,
      categoryDisplayedName: undefined,
      amount: 0,
      description: "",
      date: new Date(),
    },
  });

  const [type, categoryId, categoryDisplayedName] = watch([
    "type",
    "categoryId",
    "categoryDisplayedName",
  ]);

  console.log({ categoryId, categoryDisplayedName });

  const { mutate: addTransaction } = useAddAccountItemMutation();

  const handleFormSubmit = handleSubmit(
    ({ amount, description, categoryId, categoryDisplayedName, date }) => {
      addTransaction({
        amount: type === "EXPENSE" ? -Number(amount) : Number(amount),
        description,
        categoryId,
        categoryDisplayedName,
        date: new Date(date),
        type: type === "EXPENSE" ? "EXPENSE" : "INCOME",
      });
    }
  );

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      className="space-y-4 bg-white rounded-lg flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex space-x-2">
        <Button
          type="button"
          onClick={() => setValue("type", "EXPENSE")}
          variant={type === "EXPENSE" ? "default" : "outline"}
          className={`w-1/2 ${
            type === "EXPENSE" ? "bg-red-500 hover:bg-red-600" : ""
          }`}
        >
          <MinusCircle className="mr-2 h-4 w-4" /> 지출
        </Button>
        <Button
          type="button"
          onClick={() => setValue("type", "INCOME")}
          variant={type === "INCOME" ? "default" : "outline"}
          className={`w-1/2 ${
            type === "INCOME" ? "bg-green-500 hover:bg-green-600" : ""
          }`}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> 수입
        </Button>
      </div>

      <div className="relative">
        <Input
          type="number"
          placeholder="금액"
          {...register("amount")}
          className="w-full pl-8"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          ₩
        </span>
      </div>

      <Input
        type="text"
        placeholder="설명"
        className="w-full"
        {...register("description")}
      />

      <Select
        value={categoryId?.toString()}
        onValueChange={(value) => setValue("categoryId", Number(value))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="카테고리 선택" />
        </SelectTrigger>
        <SelectContent>
          {categories
            .filter((cat) => cat.type === type)
            .map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <div className="relative">
        <Input type="date" {...register("date")} className="w-full pl-10" />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600"
      >
        추가
      </Button>
    </motion.form>
  );
}
