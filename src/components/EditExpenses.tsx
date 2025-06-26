import React, { Dispatch, SetStateAction } from "react";
import { ExpenseForm } from "./ExpenseForm";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

// Helper to handle dialog close and clear the form
const handleDialogClose = (
  setEditOpen: Dispatch<SetStateAction<boolean>>,
  formik: any
) => {
  setEditOpen(false);
  if (formik?.resetForm) {
    formik.resetForm();
  }
};

export const EditExpenses: React.FC<IProps> = ({
  editOpen,
  setEditOpen,
  editingExpense,
  formik,
}) => {
  return (
    <Dialog
      open={editOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleDialogClose(setEditOpen, formik);
        } else {
          setEditOpen(true);
        }
      }}
    >
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-70" />
        <DialogContent className="flex-col fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 w-full md:kmin-w-4xl flex items-start gap-4 justify-center">
          <DialogTitle>Edit Expense</DialogTitle>
          <ExpenseForm
            formik={formik}
            editingExpense={editingExpense}
            setEditOpen={setEditOpen}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

interface IProps {
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
  editingExpense: any;
  formik: any;
}
