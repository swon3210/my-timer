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
import { MinusCircle, PlusCircle } from "lucide-react";
import { BudgetFormValues } from "./types";

type BudgetFormProps = {
  defaultValues?: BudgetFormValues;
  onSubmit: (formValues: BudgetFormValues) => void;
};

function BudgetForm({ defaultValues, onSubmit }: BudgetFormProps) {
  const { control, register, handleSubmit, watch } = useForm<BudgetFormValues>({
    defaultValues: defaultValues ?? {
      type: "EXPENSE",
    },
  });

  const type = watch("type");

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <div className="flex space-x-2">
            <Button
              type="button"
              onClick={() => field.onChange("EXPENSE")}
              variant={type === "EXPENSE" ? "default" : "outline"}
              className={`w-1/2 ${
                type === "EXPENSE" ? "bg-red-500 hover:bg-red-600" : ""
              }`}
            >
              <MinusCircle className="mr-2 h-4 w-4" /> 지출
            </Button>
            <Button
              type="button"
              onClick={() => field.onChange("INCOME")}
              variant={type === "INCOME" ? "default" : "outline"}
              className={`w-1/2 ${
                type === "INCOME" ? "bg-green-500 hover:bg-green-600" : ""
              }`}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> 수입
            </Button>
          </div>
        )}
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
            type={type}
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
