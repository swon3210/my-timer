import CategorySelector from "@/app/_components/CategorySelector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddBudgetsMutation } from "@/domains/account-book/budgets/useAddBudgetsMutation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type BudgetFormValues = {
  name: string;
  amount: number;
  categoryId: string;
};

type BudgetFormProps = {
  onSuccess: () => void;
};

function BudgetForm({ onSuccess }: BudgetFormProps) {
  const { control, register, handleSubmit, watch } =
    useForm<BudgetFormValues>();
  const { mutateAsync: addBudget } = useAddBudgetsMutation();

  const selectedCategoryId = watch("categoryId");

  const handleFormSubmit = handleSubmit(async (data: BudgetFormValues) => {
    try {
      await addBudget({
        name: data.name,
        categoryId: selectedCategoryId,
        amount: data.amount,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
      <Input
        {...register("name", { required: true })}
        placeholder="예산 이름"
        className="flex-grow"
      />
      <Input
        type="number"
        {...register("amount", { required: true, valueAsNumber: true })}
        placeholder="예산 금액"
        className="flex-grow"
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <CategorySelector
            type="EXPENSE"
            selectedCategoryId={field.value}
            onCategoryChange={field.onChange}
          />
        )}
      />

      <Button type="submit" className="bg-green-500 hover:bg-green-600">
        추가
      </Button>
    </form>
  );
}

export default function BudgetFormDialogButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>예산 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>예산 추가</DialogTitle>
          <DialogDescription>
            예산을 추가하여 예산을 관리해보세요.
          </DialogDescription>
        </DialogHeader>
        <BudgetForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
