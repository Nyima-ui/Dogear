"use client";
import { IBookDocument } from "@/types";
import { createContext, useContext, useState } from "react";

interface BookPanelContextValue {
  openForEdit: (book: IBookDocument) => void;
  openForCreate: () => void;
  close: () => void;
  isOpen: boolean;
  editingBook: IBookDocument | null;
  isSaving: boolean;
  setIsSaving: (v: boolean) => void;
}

const BookPanelContext = createContext<BookPanelContextValue | null>(null);

export const BookPanelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingBook, setEditingBook] = useState<IBookDocument | null>(null);

  const openForEdit = (book: IBookDocument) => {
    setEditingBook(book);
    setIsOpen(true);
  };

  const openForCreate = () => {
    setEditingBook(null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingBook(null);
  };
  return (
    <BookPanelContext.Provider
      value={{
        openForEdit,
        openForCreate,
        close,
        isOpen,
        editingBook,
        isSaving,
        setIsSaving,
      }}
    >
      {children}
    </BookPanelContext.Provider>
  );
};

export const useBookPanel = () => {
  const ctx = useContext(BookPanelContext);
  if (!ctx)
    throw new Error("useBookPanel must be used inside BookPanelProvider");
  return ctx;
};
