import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function BudgetFormDialogButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>내역 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>내역 추가</DialogTitle>
        <ExpenseForm />
      </DialogContent>
    </Dialog>
  );
}
