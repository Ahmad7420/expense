import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export const DeleteConformationDialog: React.FC<IProps> = ({
  deleteConfirmId,
  handleDelete,
  setDeleteConfirmId,
}) => {
  return (
    <Dialog
      open={!!deleteConfirmId}
      onOpenChange={(open) => setDeleteConfirmId(open ? deleteConfirmId : null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-1 bg-gray-300 rounded hover:cursor-pointer"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleDelete}
            className="px-4 py-1 bg-red-500 text-white rounded hover:cursor-pointer"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface IProps {
  setDeleteConfirmId: Dispatch<SetStateAction<string | null>>;
  deleteConfirmId: string | null;
  handleDelete: () => Promise<void>;
}
