"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronsRight, Image as ImageIcon } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Button from "./Button";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { IBook, IBookDocument } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { createBook, updateBook } from "@/lib/actions/book.action";
import { Status, Rating } from "@/types";
import { styleMapForRating, styleMapForStatus } from "@/lib/constants";
import FieldDropdown from "./FieldDropdown";
import DateField from "./DateField";
import StarRow from "./StarRow";
import { useBookPanel } from "@/contexts/BookPanelContext";
import { toast } from "sonner";

interface BookPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IBookDocument | null;
}

type OpenField = "status" | "startDate" | "finishDate" | "rating" | null;

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: "Reading", label: "Reading" },
  { value: "Finished", label: "Finished" },
  { value: "TBR", label: "TBR" },
];

const RATING_OPTIONS: { value: NonNullable<Rating> }[] = [
  { value: 5 },
  { value: 4 },
  { value: 3 },
  { value: 2 },
  { value: 1 },
];

const BookPanel = ({ initialData, onClose }: BookPanelProps) => {
  const [openField, setOpenField] = useState<OpenField>(null);

  const [status, setStatus] = useState<Status>(initialData?.status ?? "None");
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialData?.startDate ? new Date(initialData.startDate) : undefined,
  );
  const [finishDate, setFinishDate] = useState<Date | undefined>(
    initialData?.finishDate ? new Date(initialData.finishDate) : undefined,
  );
  const [rating, setRating] = useState<Rating>(
    initialData?.rating ?? undefined,
  );

  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const { isSaving, setIsSaving } = useBookPanel();

  const formRef = useRef<HTMLFormElement>(null);
  const { userId } = useAuth();

  const statusRef = useOutsideClick<HTMLDivElement>(
    openField === "status",
    () => setOpenField(null),
  );

  const startCalendarRef = useOutsideClick<HTMLDivElement>(
    openField === "startDate",
    () => setOpenField(null),
  );

  const finishCalendarRef = useOutsideClick<HTMLDivElement>(
    openField === "finishDate",
    () => setOpenField(null),
  );

  const ratingRef = useOutsideClick<HTMLDivElement>(
    openField === "rating",
    () => setOpenField(null),
  );

  const toggle = (field: OpenField) =>
    setOpenField((prev) => (prev === field ? null : field));

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreviewUrl(URL.createObjectURL(file));
  };

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      if (!userId) return;

      const formData = new FormData(e.target);
      const title = formData.get("book-title") as string;
      const author = formData.get("book-author") as string;
      const review = formData.get("book-review") as string;

      if (status === "None") {
        toast.error("Please select a status before saving.");
        return;
      }
      
      let coverUrl = initialData?.coverUrl ?? "";
      if (coverFile) {
        const uploadedBookCover = await upload(
          `${title}_cover.png`,
          coverFile,
          {
            access: "public",
            handleUploadUrl: "/api/upload",
            contentType: coverFile.type,
          },
        );

        coverUrl = uploadedBookCover.url;
      }

      const payload: IBook = {
        clerkId: userId,
        title,
        author,
        status,
        startDate,
        finishDate,
        rating,
        review,
        coverUrl,
      };

      if (initialData) {
        await updateBook(initialData?._id, payload, initialData.coverUrl);
      } else {
        await createBook(payload);
      }

      onClose();

      if (initialData) {
        toast.success(`${initialData?.title} has been updated.`);
      } else {
        toast.success(`${title} added to your library.`);
      }
    } catch (e) {
      console.error("Error adding book to table", e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="p-1 rounded-md hover:bg-primary-600 cursor-pointer"
        disabled={isSaving}
        onClick={() => onClose()}
      >
        <ChevronsRight strokeWidth={1.7} color="#363636" />
      </button>
      <form
        className="px-8 mt-6 max-sm:px-0"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {/* COVER + TITLE/AUTHOR  */}
        <div className="flex gap-4">
          {/* COVER  */}
          <div className="w-30 h-45 bg-primary-600 rounded-md flex justify-center items-center overflow-hidden">
            {coverPreviewUrl || initialData?.coverUrl ? (
              <Image
                width={120}
                height={180}
                src={coverPreviewUrl || initialData?.coverUrl || ""}
                alt={"Book cover url"}
              />
            ) : (
              <ImageIcon
                strokeWidth={1}
                className="text-foreground/30"
                size={34}
              />
            )}
          </div>
          {/* INPUT FIELDS  */}
          <div className="grow">
            <div>
              <label htmlFor="book-title" className="sr-only">
                Book Title
              </label>
              <input
                type="text"
                id="book-title"
                name="book-title"
                placeholder="New title"
                className="text-xl w-full py-3 px-1 rounded-md placeholder:text-foreground border-b border-black/20 focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                defaultValue={initialData?.title ?? ""}
                required
              />
            </div>
            <div>
              <label htmlFor="book-author" className="sr-only">
                Book Author
              </label>
              <input
                type="text"
                id="book-author"
                name="book-author"
                placeholder="Author"
                className="text-sm w-full py-1.5 px-1 rounded-md border-b border-black/20 focus:outline-none focus:ring-1 focus:ring-primary mt-5 focus:border-none"
                defaultValue={initialData?.author ?? ""}
                required
              />
            </div>
          </div>
        </div>

        {/* FIELDS  */}
        <div className="mt-8 space-y-4">
          {/* FIRST FIELD  */}
          <FieldDropdown
            label="Status"
            display={
              <span className={cn(styleMapForStatus[status])}>
                {status === "None" ? "Reading" : status}
              </span>
            }
            isOpen={openField === "status"}
            onToggle={() => toggle("status")}
            dropdownRef={statusRef}
          >
            {STATUS_OPTIONS.map(({ value, label }) => (
              <li key={value} className="hover:bg-primary-400">
                <button
                  type="button"
                  className="cursor-pointer select-none text-sm w-full flex p-1"
                  onClick={() => {
                    setStatus(value);
                    setOpenField(null);
                  }}
                >
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-md",
                      styleMapForStatus[value],
                    )}
                  >
                    {label}
                  </span>
                </button>
              </li>
            ))}
          </FieldDropdown>

          {/* SECOND FIELD  */}
          <DateField
            label="Start date"
            value={startDate}
            isOpen={openField === "startDate"}
            onToggle={() => toggle("startDate")}
            onChange={(date) => {
              setStartDate(date);
              setOpenField(null);
            }}
            calendarRef={startCalendarRef}
          />

          {/* THIRD FIELD  */}
          <DateField
            label="Finished date"
            value={finishDate}
            isOpen={openField === "finishDate"}
            onToggle={() => toggle("finishDate")}
            onChange={(date) => {
              setFinishDate(date);
              setOpenField(null);
            }}
            calendarRef={finishCalendarRef}
          />

          {/* FOURTH FIELD  */}
          <FieldDropdown
            label="Rating"
            display={
              <span
                className={cn(
                  rating
                    ? styleMapForRating[rating]
                    : "text-foreground/30 text-sm",
                )}
              >
                {rating === undefined ? "Empty" : <StarRow count={rating} />}
              </span>
            }
            isOpen={openField === "rating"}
            onToggle={() => toggle("rating")}
            dropdownRef={ratingRef}
          >
            {RATING_OPTIONS.map(({ value }) => (
              <li key={value}>
                <button
                  type="button"
                  className="flex w-full rounded-md cursor-pointer hover:bg-primary-400 p-1"
                  onClick={() => {
                    setRating(value);
                    setOpenField(null);
                  }}
                >
                  <span
                    className={cn(
                      "inline-flex p-1 rounded-md gap-0.5",
                      styleMapForRating[value],
                    )}
                  >
                    <StarRow count={value} />
                  </span>
                </button>
              </li>
            ))}
          </FieldDropdown>

          {/* COVER UPLOAD  */}
          <div className="flex items-center ">
            <label
              htmlFor="cover-url"
              className="w-34 text-foreground/70 block shrink-0"
            >
              Cover
            </label>
            <input
              type="file"
              id="cover-url"
              name="cover-url"
              accept="image/*"
              className="text-sm py-1.5 border-b border-black/20 focus:outline-none focus:ring-1 focus:ring-primary focus:rounded-md placeholder:text-foreground/30 focus:border-none cursor-pointer w-full"
              placeholder="Paste image URL"
              onChange={handleCoverUpload}
            />
          </div>

          {/* SIXTH FIELD  */}
          <div className="mt-10">
            <label htmlFor="review" className="w-34 text-foreground/70">
              Review
            </label>
            <textarea
              name="book-review"
              id="review"
              placeholder="Write a review..."
              className="block w-full text-sm grow py-1.5 border-b border-black/20 focus:outline-none focus:ring-1 focus:ring-primary focus:rounded-md focus:px-1 placeholder:text-foreground/30 focus:border-none mt-3"
              defaultValue={initialData?.review ?? ""}
            ></textarea>
          </div>

          <Button
            text="Save book"
            type="submit"
            className="px-3"
            loading={isSaving}
          />
        </div>
      </form>
    </div>
  );
};

export default BookPanel;
