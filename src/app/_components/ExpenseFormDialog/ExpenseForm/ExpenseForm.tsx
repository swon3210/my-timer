"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MinusCircle, Calendar, HandCoins, PlusCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import CategorySelector from "../../CategorySelector";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ExpenseFormValues } from "../types";
import { TransactionType } from "@/app/api/account-books/transactions/types";
import FrequencySelector from "./FrequencySelector";

export default function ExpenseForm({
  onSubmit,
  defaultValues,
  selectableTransactionTypes = ["EXPENSE", "INCOME", "FLEX"],
}: {
  onSubmit: (formValues: ExpenseFormValues) => void;
  defaultValues?: Partial<ExpenseFormValues>;
  selectableTransactionTypes?: TransactionType[];
}) {
  const { control, register, handleSubmit, watch, setValue, getValues } =
    useForm<ExpenseFormValues>({
      defaultValues: defaultValues ?? {
        type: "EXPENSE",
        categoryId: undefined,
        amount: undefined,
        description: "",
        date: dayjs().format("YYYY-MM-DD"),
        frequency: undefined,
      },
    });

  const [type] = watch(["type"]);

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit(formValues);
  });

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      className="space-y-4 bg-white rounded-lg flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex space-x-2">
        {selectableTransactionTypes.includes("EXPENSE") && (
          <Button
            type="button"
            onClick={() => setValue("type", "EXPENSE")}
            variant={type === "EXPENSE" ? "default" : "outline"}
            className={cn(
              "basis-1/3 grow",
              type === "EXPENSE" && "bg-red-400 hover:bg-red-500"
            )}
          >
            <MinusCircle className="h-4 w-4" /> 지출
          </Button>
        )}
        {selectableTransactionTypes.includes("INCOME") && (
          <Button
            type="button"
            onClick={() => setValue("type", "INCOME")}
            variant={type === "INCOME" ? "default" : "outline"}
            className={cn(
              "basis-1/3 grow",
              type === "INCOME" && "bg-green-400 hover:bg-green-500"
            )}
          >
            <PlusCircle className="h-4 w-4" /> 수입
          </Button>
        )}
        {selectableTransactionTypes.includes("FLEX") && (
          <Button
            type="button"
            onClick={() => setValue("type", "FLEX")}
            variant={type === "FLEX" ? "default" : "outline"}
            className={cn(
              "basis-1/3 grow",
              type === "FLEX" && "bg-yellow-400 hover:bg-yellow-500"
            )}
          >
            <HandCoins className="h-4 w-4" /> FLEX
          </Button>
        )}
      </div>

      <div className="relative">
        <Input
          type="number"
          placeholder="금액"
          {...register("amount", {
            valueAsNumber: true,
            required: true,
          })}
          className="w-full pl-8"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          ₩
        </span>
      </div>

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <CategorySelector
            type={type}
            selectedCategoryId={field.value}
            onCategoryChange={field.onChange}
          />
        )}
      />

      <Input
        type="text"
        placeholder="설명 (Optional)"
        className="w-full"
        {...register("description")}
      />

      <Controller
        control={control}
        name="frequency"
        render={({ field }) => (
          <FrequencySelector
            selectedFrequency={field.value}
            onFrequencyChange={field.onChange}
          />
        )}
      />

      <div className="relative">
        <Input
          type="date"
          defaultValue={dayjs(getValues("date")).format("YYYY-MM-DD")}
          max={dayjs().format("YYYY-MM-DD")}
          {...register("date")}
          className="w-full pl-10"
        />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600"
      >
        확인
      </Button>
    </motion.form>
  );
}
