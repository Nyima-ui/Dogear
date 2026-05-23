"use client";
import { IBookDocument, Status } from "@/types";
import { formatDate } from "@/lib/utils";
import { Trash2, PanelLeft, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { styleMapForRating, styleMapForStatus } from "@/lib/constants";
import Star from "@/public/svgs/Star";
import { useState } from "react";
import CustomSquare from "@/public/svgs/Square";
import CheckedBox from "@/public/svgs/CheckedBox";
import { deleteBookById } from "@/lib/actions/book.action";
import { useBookPanel } from "@/contexts/BookPanelContext";
import StatusFilter from "./StatusFilter";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "sonner";
import DeleteModal from "./DeleteModal";

const BookTable = ({ books }: { books: IBookDocument[] }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [activeStatuses, setActiveStatuses] = useState<Set<Status>>(new Set());
  const statusFilterRef = useOutsideClick(showStatusFilter, () =>
    setShowStatusFilter(false),
  );

  const { openForEdit } = useBookPanel();

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) =>
      prev.size === books.length ? new Set() : new Set(books.map((b) => b._id)),
    );
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const count = selectedIds.size;
      await deleteBookById([...selectedIds]);
      setIsDeleteModalOpen(false);

      toast.success(
        count === 1
          ? "1 book removed from your library."
          : `${count} books removed from your library.`,
      );

      setSelectedIds(new Set());
    } catch (e) {
      toast.error(`Something went wrong. Please try again.`);
      console.error("Error deleting rows", e);
    } finally {
      setLoadingDelete(false);
    }
  };

  const filteredBooks =
    activeStatuses.size === 0
      ? books
      : books.filter((b) => activeStatuses.has(b.status));

  const toggleStatus = (status: Status) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  return (
    <div className="overflow-x-auto h-[80vh] mt-3 w-full border-black/20 rounded-md overflow-y-auto">
      {selectedIds.size > 0 && (
        <button
          className="flex items-center text-xs cursor-pointer border border-black/10 p-2 gap-1.5 rounded-md my-2 hover:bg-foreground/5"
          onClick={confirmDelete}
        >
          <span>
            <Trash2 size={15} className="text-foreground" strokeWidth={1} />
          </span>
          <span>Delete {selectedIds.size} item</span>
        </button>
      )}

      {isDeleteModalOpen && selectedIds.size > 0 && (
        <DeleteModal
          count={selectedIds.size}
          onDelete={handleDelete}
          onClose={setIsDeleteModalOpen}
          loading={loadingDelete}
        />
      )}

      <table
        aria-label="Book list"
        className={cn(
          `min-w-max border-r border-b border-black/20 w-full bg-background rounded-md border-separate border-spacing-0 text-sm`,
          "[&_td]:border-b [&_td]:border-black/20 [&_tr:last-child_td]:border-b-0 [&_thead_th]:py-4 [&_thead_th]:font-medium [&_thead_th]:text-left [&_thead_th]:border-b [&_thead_th]:border-t [&_thead_th]:border-black/20 [&_thead_th]:text-foreground/80",
        )}
      >
        {/* TABLE HEADING ROW  */}
        <thead className="bg-primary-600 sticky top-0 z-20">
          <tr>
            <th
              scope="col"
              className="w-12 sticky left-0 z-30 bg-primary-600 border-l shadow-2xl"
            >
              <button
                className="w-full flex justify-center cursor-pointer"
                onClick={toggleAll}
              >
                {selectedIds.size === books.length && books.length > 0 ? (
                  <CheckedBox />
                ) : (
                  <CustomSquare />
                )}
              </button>
            </th>
            <th scope="col" className="w-43 pl-0.5">
              Title
            </th>
            <th scope="col" className="w-32">
              Author
            </th>
            <th
              scope="col"
              className="w-26 relative"
              ref={statusFilterRef as React.RefObject<HTMLTableCellElement>}
            >
              <div className="flex items-center gap-3">
                <span>Status</span>
                <button
                  className="cursor-pointer px-1 py-0.5 hover:bg-foreground/5 rounded-md"
                  onClick={() => setShowStatusFilter((p) => !p)}
                >
                  <ChevronsUpDown
                    strokeWidth={2}
                    className="text-primary"
                    size={14}
                  />
                </button>
              </div>
              {showStatusFilter && (
                <div className="absolute top-10 left-15">
                  <StatusFilter
                    activeStatuses={activeStatuses}
                    onToggle={toggleStatus}
                  />
                </div>
              )}
            </th>
            <th scope="col" className="w-35.5">
              Start date
            </th>
            <th scope="col" className="w-35.5">
              Finish date
            </th>
            <th scope="col" className="w-30">
              Rating
            </th>
            <th scope="col" className="w-75">
              Review
            </th>
            <th scope="col" className="text-center! w-30">
              Cover
            </th>
          </tr>
        </thead>

        {/* TABLE BODY  */}
        <tbody>
          {filteredBooks.map((b) => (
            <tr key={b._id} className="border-b border-black">
              <td className="py-4 sticky left-0 z-10 bg-background border-l shadow-2xl">
                <button
                  className="flex justify-center w-full cursor-pointer"
                  onClick={() => toggleRow(b._id)}
                >
                  {selectedIds.has(b._id) ? <CheckedBox /> : <CustomSquare />}
                </button>
              </td>
              <td className="font-medium">
                <div className="group relative px-1">
                  <span className="line-clamp-1 ">{b.title}</span>
                  <button
                    className="items-center cursor-pointer border border-black/10 rounded-md py-0.5 px-1 gap-0.75 absolute top-0.5 right-4 bg-background hidden group-hover:flex shadow-sm"
                    onClick={() => openForEdit(b)}
                  >
                    <PanelLeft
                      size={15}
                      className="text-foreground/60 block"
                      strokeWidth={1.5}
                    />
                    <span className="uppercase text-xs text-foreground/60 block leading-none">
                      OPEN
                    </span>
                  </button>
                </div>
              </td>
              <td>{b.author}</td>
              <td>
                <span className={cn(styleMapForStatus[b.status])}>
                  {b.status}
                </span>
              </td>
              <td className="pr-4">
                {b.startDate ? formatDate(b.startDate) : "-"}
              </td>
              <td className="pr-4">
                {b.finishDate ? formatDate(b.finishDate) : "-"}
              </td>
              <td>
                {b.rating ? (
                  <span className={cn(styleMapForRating[b.rating])}>
                    {Array.from({ length: b.rating }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td className="pr-4">
                <p className="line-clamp-1">{b.review ? b.review : ""}</p>
              </td>
              <td>
                <span className="flex justify-center">
                  {b.coverUrl ? (
                    <Image
                      width={20}
                      height={31}
                      src={b.coverUrl}
                      alt={"Book cover of Book Thief"}
                      className="rounded-xs"
                    />
                  ) : (
                    <div className="w-5 h-7.75 bg-primary-700/70 rounded-xs"></div>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
