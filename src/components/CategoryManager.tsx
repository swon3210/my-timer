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
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useFinance } from "./FinanceContext";

export default function CategoryManager() {
  const { categories, addCategory, removeCategory, editCategory } =
    useFinance();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState<"income" | "expense">(
    "expense"
  );
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (newCategoryName) {
      addCategory(newCategoryName, newCategoryType);
      setNewCategoryName("");
    }
  };

  // const handleEditCategory = (id: string, newName: string) => {
  //   editCategory(id, newName);
  //   setEditingCategory(null);
  // };

  return (
    <motion.div
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex space-x-2">
        <Input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="새 카테고리 이름"
          className="flex-grow"
        />
        <Select
          value={newCategoryType}
          onValueChange={(value: "income" | "expense") =>
            setNewCategoryType(value)
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">수입</SelectItem>
            <SelectItem value="expense">지출</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleAddCategory}
          className="bg-green-500 hover:bg-green-600"
        >
          <Plus className="w-4 h-4 mr-2" /> 추가
        </Button>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {editingCategory === category.id ? (
              <Input
                value={category.name}
                onChange={(e) => editCategory(category.id, e.target.value)}
                onBlur={() => setEditingCategory(null)}
                autoFocus
                className="flex-grow"
              />
            ) : (
              <span className="flex-grow font-medium">{category.name}</span>
            )}
            <span
              className={`text-sm px-2 py-1 rounded ${
                category.type === "income"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {category.type === "income" ? "수입" : "지출"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingCategory(category.id)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeCategory(category.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
