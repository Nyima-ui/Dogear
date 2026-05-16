"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import Star from "@/public/svgs/Star";
import { ChevronsRight, Image as ImageIcon, ChevronDown } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Button from "./Button";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { IBook } from "@/types";
import { useAuth } from "@clerk/nextjs";

type Status = "Reading" | "Finished" | "TBR" | "None";
type Rating = 1 | 2 | 3 | 4 | 5 | undefined;

const styleMapForStatus: Record<Status, string> = {
  Reading:
    "bg-[#E1E1FE] text-[#1E23FB] px-2 py-0.5 rounded-md cursor-pointer select-none text-sm",
  Finished:
    "bg-[#BBF7D1] text-[#157F3D] px-2 py-0.5 rounded-md cursor-pointer select-none text-sm",
  TBR: "bg-[#FDE689] text-[#D87706] px-2 py-0.5 rounded-md cursor-pointer select-none text-sm",
  None: "text-foreground/30 py-0.5 text-sm",
};

const styleMapForRating: Record<number, string> = {
  5: "flex p-1 rounded-md bg-[#E1E1FD] gap-0.5",
  4: "flex p-1 rounded-md bg-[#DCFCE7] gap-0.5",
  3: "flex p-1 rounded-md bg-[#FFE0B2] gap-0.5",
  2: "flex p-1 rounded-md bg-[#FFF2C8] gap-0.5",
  1: "flex p-1 rounded-md bg-[#FEE2E1] gap-0.5",
};

interface BookPanelProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookPanel = ({ onClose }: BookPanelProps) => {
  const [isStatusDropDownOpened, setisStatusDropDownOpened] = useState(false);
  const [status, setStatus] = useState<Status>("None");
  const statusRef = useOutsideClick(isStatusDropDownOpened, () =>
    setisStatusDropDownOpened(false),
  );

  const [isStartCalendaryOpened, setIsStartCalendaryOpened] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const startCalendarRef = useOutsideClick(isStartCalendaryOpened, () =>
    setIsStartCalendaryOpened(false),
  );

  const [isFinishCalendarOpened, setIsFinishCalendarOpened] = useState(false);
  const [finishDate, setFinishDate] = useState<Date | undefined>(undefined);
  const finishCalendarRef = useOutsideClick(isFinishCalendarOpened, () =>
    setIsFinishCalendarOpened(false),
  );

  const [isRatingDropDownOpened, setIsRatingDropDownOpened] = useState(false);
  const [rating, setRating] = useState<Rating>(undefined);
  const ratingRef = useOutsideClick(isRatingDropDownOpened, () =>
    setIsRatingDropDownOpened(false),
  );

  const [coverUrl, setCoverUrl] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { userId } = useAuth();

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!userId) return;

      const formData = new FormData(e.target);

      const title = formData.get("book-title");
      const author = formData.get("book-author");
      const review = formData.get("book-review");

      let coverUrl = "";
      if (coverFile) {
        const uploadedBookCover = await upload(
          `${title}_cover.png`,
          coverFile,
          {
            access: "public",
            handleUploadUrl: "/api/upload",
            contentType: "image/png",
          },
        );

        coverUrl = uploadedBookCover.url;
      }

      const payload = {
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

      console.log(payload);

      onClose(false);
    } catch (e) {
      console.error("Error adding book to table", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="p-1 rounded-md hover:bg-primary-600 cursor-pointer"
        onClick={() => onClose(false)}
      >
        <ChevronsRight strokeWidth={1.7} color="#363636" />
      </button>
      <form
        className="px-8 mt-6 max-sm:px-0"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {/* FIRST PART  */}
        <div className="flex gap-4">
          {/* IMAGE  */}
          <div className="w-[120px] h-[180px] bg-primary-600 rounded-md flex justify-center items-center overflow-hidden">
            {coverUrl ? (
              <Image
                width={120}
                height={180}
                src={coverUrl}
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
                required
              />
            </div>
          </div>
        </div>

        {/* SECOND PART  */}
        <div className="mt-8 space-y-4">
          {/* FIRST FIELD  */}
          <div className="flex items-center">
            <span className="w-[136px] text-foreground/70">Status</span>

            <div
              className="border-b border-black/20 py-2 flex justify-between grow cursor-pointer relative"
              onClick={() => setisStatusDropDownOpened((p) => !p)}
            >
              <span className={cn(``, styleMapForStatus[status])}>
                {status === "None" ? "Reading" : status}
              </span>
              <span>
                <ChevronDown
                  size={20}
                  className="text-foreground/30"
                  strokeWidth={1.7}
                />
              </span>
              {isStatusDropDownOpened && (
                <div
                  ref={statusRef}
                  className="absolute top-1 left-0 z-50 w-full"
                >
                  <ul className="bg-background w-full border rounded-md border-black/10 p-1 shadow-lg shadow-black/5">
                    <li className="hover:bg-primary-400">
                      <button
                        type="button"
                        className="cursor-pointer select-none text-sm w-full flex p-1"
                        onClick={() => setStatus("Reading")}
                      >
                        <span className="bg-[#E1E1FE] text-[#1E23FB] px-2 py-0.5 rounded-md">
                          Reading
                        </span>
                      </button>
                    </li>
                    <li className="hover:bg-primary-400">
                      <button
                        type="button"
                        className="cursor-pointer select-none text-sm w-full flex p-1"
                        onClick={() => setStatus("Finished")}
                      >
                        <span className="bg-[#BBF7D1] text-[#157F3D] px-2 py-0.5 rounded-md">
                          Finished
                        </span>
                      </button>
                    </li>
                    <li className="hover:bg-primary-400">
                      <button
                        type="button"
                        className="cursor-pointer select-none text-sm w-full flex p-1"
                        onClick={() => setStatus("TBR")}
                      >
                        <span className="bg-[#FDE689] text-[#D87706] px-2 py-0.5 rounded-md">
                          TBR
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* SECOND FIELD  */}
          <div className="flex items-center">
            <span className="w-[136px] text-foreground/70">Start date</span>

            <div
              className={cn(
                `border-b border-black/20 py-2 flex justify-between cursor-pointer relative grow`,
                isStartCalendaryOpened && "grow-0 w-[238px]",
              )}
              onClick={() => setIsStartCalendaryOpened((p) => !p)}
            >
              <span
                className={cn(
                  `text-sm`,
                  startDate ? "text-foreground" : "text-foreground/30",
                )}
              >
                {startDate
                  ? startDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Empty"}
              </span>
              {isStartCalendaryOpened && (
                <div
                  className="absolute bottom-0"
                  ref={startCalendarRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar
                    mode="single"
                    className="w-[238px] bg-background text-foreground border border-black/10 rounded-md shadow-md text-sm"
                    selected={startDate}
                    onSelect={(date: Date | undefined) => {
                      setStartDate(date);
                      setIsStartCalendaryOpened(false);
                    }}
                    fixedWeeks
                  />
                </div>
              )}
            </div>
          </div>

          {/* THIRD FIELD  */}
          <div className="flex items-center">
            <span className="w-[136px] text-foreground/70">Finished date</span>

            <div
              className={cn(
                `border-b border-black/20 py-2 flex justify-between cursor-pointer relative grow`,
                isFinishCalendarOpened && "grow-0 w-[238px]",
              )}
              onClick={() => setIsFinishCalendarOpened((p) => !p)}
            >
              <span
                className={cn(
                  `text-sm`,
                  finishDate ? "text-foreground" : "text-foreground/30",
                )}
              >
                {finishDate
                  ? finishDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Empty"}
              </span>
              {isFinishCalendarOpened && (
                <div
                  className="absolute bottom-0"
                  ref={finishCalendarRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar
                    mode="single"
                    className="w-[238px] bg-background text-foreground border border-black/10 rounded-md shadow-md text-sm"
                    selected={finishDate}
                    onSelect={(date: Date | undefined) => {
                      setFinishDate(date);
                      setIsFinishCalendarOpened(false);
                    }}
                    fixedWeeks
                  />
                </div>
              )}
            </div>
          </div>

          {/* FOURTH FIELD  */}
          <div className="flex items-center">
            <span className="w-[136px] text-foreground/70">Rating</span>

            <div
              className="border-b border-black/20 py-2 flex justify-between grow cursor-pointer relative"
              onClick={() => setIsRatingDropDownOpened((p) => !p)}
            >
              <span
                className={cn(
                  rating
                    ? styleMapForRating[rating]
                    : "text-foreground/30 text-sm",
                )}
              >
                {rating === undefined
                  ? "Empty"
                  : Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} />
                    ))}
              </span>
              <span>
                <ChevronDown
                  size={20}
                  className="text-foreground/30"
                  strokeWidth={1.7}
                />
              </span>
              {isRatingDropDownOpened && (
                <div
                  ref={ratingRef}
                  className="absolute top-1 left-0 z-50 w-full"
                >
                  <ul className="bg-background w-full border rounded-md border-black/10 p-1 shadow-lg shadow-black/5">
                    <li>
                      <button
                        type="button"
                        className="flex w-full rounded-md cursor-pointer hover:bg-primary-400 p-1"
                        onClick={() => setRating(5)}
                      >
                        <span className="inline-flex p-1 rounded-md bg-[#E1E1FD] gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} />
                          ))}
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="flex w-full rounded-md cursor-pointer hover:bg-primary-400 p-1"
                        onClick={() => setRating(4)}
                      >
                        <span className="inline-flex p-1 rounded-md bg-[#DCFCE7] gap-0.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Star key={i} />
                          ))}
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="flex w-full rounded-md cursor-pointer hover:bg-primary-400 p-1"
                        onClick={() => setRating(3)}
                      >
                        <span className="inline-flex p-1 rounded-md bg-[#FFE0B2] gap-0.5">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Star key={i} />
                          ))}
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="flex w-full rounded-md cursor-pointer hover:bg-primary-400 p-1"
                        onClick={() => setRating(2)}
                      >
                        <span className="inline-flex p-1 rounded-md bg-[#FFF2C8] gap-0.5">
                          {Array.from({ length: 2 }).map((_, i) => (
                            <Star key={i} />
                          ))}
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="flex w-full rounded-md cursor-pointer hover:bg-primary-400 p-1"
                        onClick={() => setRating(1)}
                      >
                        <span className="inline-flex p-1 rounded-md bg-[#FEE2E1] gap-0.5">
                          {Array.from({ length: 1 }).map((_, i) => (
                            <Star key={i} />
                          ))}
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* FIFTH FIELD  */}
          <div className="flex items-center ">
            <label
              htmlFor="cover-url"
              className="w-[136px] text-foreground/70 block shrink-0"
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
            <label htmlFor="review" className="w-[136px] text-foreground/70">
              Review
            </label>
            <textarea
              name="book-review"
              id="review"
              placeholder="Write a review..."
              className="block w-full text-sm grow py-1.5 border-b border-black/20 focus:outline-none focus:ring-1 focus:ring-primary focus:rounded-md focus:px-1 placeholder:text-foreground/30 focus:border-none mt-3"
            ></textarea>
          </div>

          <Button
            text="Save book"
            type="submit"
            className="px-3"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default BookPanel;
