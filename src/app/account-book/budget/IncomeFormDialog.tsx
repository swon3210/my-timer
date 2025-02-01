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
import { IncomeFormValues } from "./types";

type IncomeFormProps = {
  defaultValues?: IncomeFormValues;
  onSubmit: (formValues: IncomeFormValues) => void;
};

function IncomeForm({ defaultValues, onSubmit }: IncomeFormProps) {
  const { control, register, handleSubmit } = useForm<IncomeFormValues>({
    defaultValues: defaultValues,
  });

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <CategorySelector
            type="INCOME"
            selectedCategoryId={field.value}
            onCategoryChange={field.onChange}
          />
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

      <Button type="submit" className="bg-green-500 hover:bg-green-600">
        추가
      </Button>
    </form>
  );
}

type IncomeFormDialogProps = {
  isOpen: boolean;
  close: () => void;
} & IncomeFormProps;

export default function IncomeFormDialog({
  isOpen,
  close,
  defaultValues,
  onSubmit,
}: IncomeFormDialogProps) {
  const handleIncomeFormSubmit = (formValues: IncomeFormValues) => {
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
        <IncomeForm
          defaultValues={defaultValues}
          onSubmit={handleIncomeFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
