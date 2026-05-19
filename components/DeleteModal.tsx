"use client";
import { Loader2 } from "lucide-react";

interface DeleteModalProps {
  count: number;
  loading: boolean;
  onDelete: () => void;
  onClose: (v: boolean) => void;
}

const DeleteModal = ({
  count,
  loading,
  onDelete,
  onClose,
}: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 bg-foreground/20 flex items-center justify-center z-50 backdrop-blur-xs">
      <div
        className="space-y-8 bg-background w-[90%] max-w-sm py-6 rounded-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="border-b border-black/20 pb-3 space-y-2">
          <h2 className="text-center font-medium text-xl" id="modal-title">
            Delete {count} {count > 1 ? "books" : "book"}?
          </h2>
          <p className="text-center">This can&apos;t be undone.</p>
        </div>
        <div className="flex px-6 gap-2.5">
          <button
            className="grow border border-stroke py-2 rounded-md cursor-pointer hover:bg-foreground/8 transition-all duration-100 ease-in"
            type="button"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className="grow bg-[#FF6467] text-background cursor-pointer rounded-md hover:bg-[#FF5255] transition-all duration-100 ease-in flex items-center justify-center gap-3"
            type="button"
            onClick={onDelete}
            disabled={loading}
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
