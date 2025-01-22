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
import { HandCoins, MinusCircle } from "lucide-react";
import { OutcomeFormValues } from "./types";
import { cn } from "@/lib/utils";

type OutcomeFormProps = {
  defaultValues?: OutcomeFormValues;
  onSubmit: (formValues: OutcomeFormValues) => void;
};

function OutcomeForm({ defaultValues, onSubmit }: OutcomeFormProps) {
  const { control, register, handleSubmit, watch } = useForm<OutcomeFormValues>(
    {
      defaultValues: defaultValues ?? {
        type: "EXPENSE",
      },
    }
  );

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
              className={cn(
                "w-1/2",
                type === "EXPENSE" && "bg-red-400 hover:bg-red-500"
              )}
            >
              <MinusCircle className="h-4 w-4" /> 지출
            </Button>
            <Button
              type="button"
              onClick={() => field.onChange("FLEX")}
              variant={type === "FLEX" ? "default" : "outline"}
              className={cn(
                "w-1/2",
                type === "FLEX" && "bg-yellow-400 hover:bg-yellow-500"
              )}
            >
              <HandCoins className="h-4 w-4" /> FLEX
            </Button>
          </div>
        )}
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

type OutcomeFormDialogProps = {
  isOpen: boolean;
  close: () => void;
} & OutcomeFormProps;

export default function OutcomeFormDialog({
  isOpen,
  close,
  defaultValues,
  onSubmit,
}: OutcomeFormDialogProps) {
  const handleOutcomeFormSubmit = (formValues: OutcomeFormValues) => {
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
        <OutcomeForm
          defaultValues={defaultValues}
          onSubmit={handleOutcomeFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
