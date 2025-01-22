import { ExpenseFormValues } from "../types";
import ExpenseForm from "./ExpenseForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function ExpenseFormDialog({
  isOpen,
  close,
  onSubmit,
  defaultValues,
}: {
  isOpen: boolean;
  close: () => void;
  onSubmit: (formValues: ExpenseFormValues) => void;
  defaultValues?: ExpenseFormValues;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>내역 추가</DialogTitle>
        <ExpenseForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
