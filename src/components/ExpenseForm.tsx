"use client";

import { useState } from "react";
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
import { useFinance } from "./FinanceContext";

export default function ExpenseForm() {
  const { categories, addTransaction } = useFinance();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    addTransaction({
      amount: type === "expense" ? -Number(amount) : Number(amount),
      description,
      category,
      date: new Date(date).toISOString(),
    });

    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex space-x-2">
        <Button
          type="button"
          onClick={() => setType("expense")}
          variant={type === "expense" ? "default" : "outline"}
          className={`w-1/2 ${
            type === "expense" ? "bg-red-500 hover:bg-red-600" : ""
          }`}
        >
          <MinusCircle className="mr-2 h-4 w-4" /> 지출
        </Button>
        <Button
          type="button"
          onClick={() => setType("income")}
          variant={type === "income" ? "default" : "outline"}
          className={`w-1/2 ${
            type === "income" ? "bg-green-500 hover:bg-green-600" : ""
          }`}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> 수입
        </Button>
      </div>

      <div className="relative">
        <Input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full pl-8"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          ₩
        </span>
      </div>

      <Input
        type="text"
        placeholder="설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full"
      />

      <Select value={category} onValueChange={setCategory}>
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
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full pl-10"
        />
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
