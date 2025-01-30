import CategorySelector from "@/app/_components/CategorySelector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { BudgetFormValues } from "../types";

type BudgetFormProps = {
  defaultValues?: BudgetFormValues;
  onSubmit: (formValues: BudgetFormValues) => void;
};

function BudgetForm({ defaultValues, onSubmit }: BudgetFormProps) {
  const { control, register, handleSubmit } = useForm<BudgetFormValues>({
    defaultValues,
  });

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
      <Input
        {...register("name", { required: true })}
        placeholder="예산 이름"
        className="flex-grow"
      />
      <Input
        type="number"
        {...register("amount", {
          required: true,
          valueAsNumber: true,
        })}
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

type BudgetFormDialogProps = {
  isOpen: boolean;
  close: () => void;
} & BudgetFormProps;

export default function BudgetFormDialog({
  isOpen,
  close,
  defaultValues,
  onSubmit,
}: BudgetFormDialogProps) {
  const handleBudgetFormSubmit = (formValues: BudgetFormValues) => {
    onSubmit(formValues);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>예산 추가</DialogTitle>
          <DialogDescription>
            예산을 추가하여 예산을 관리해보세요.
          </DialogDescription>
        </DialogHeader>
        <BudgetForm
          defaultValues={defaultValues}
          onSubmit={handleBudgetFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
