"use client";
import { TrendingBook } from "@/types";
import { Image as ImageIcon } from "lucide-react";
import Button from "./Button";
import Star from "@/public/svgs/Star";
import { useState } from "react";

interface TrendingBookCardProps {
  book: TrendingBook;
  onSelect: (book: TrendingBook) => void;
  handleWantToRead: (book: TrendingBook) => void;
}

const TrendingBookCard = ({
  book,
  onSelect,
  handleWantToRead,
}: TrendingBookCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleOnClickWantToRead = async () => {
    try {
      setLoading(true);
      await handleWantToRead(book);
    } catch (e) {
      console.error("Error adding booking on table.", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <li className="bg-card  flex items-center justify-between px-6 py-4 rounded-md gap-6 hover:shadow-md hover:shadow-primary-700/20 hover:bg-primary-500/70 transition-all duration-150 ease-in max-sm:px-3">
      {/* FIRST DIV  */}
      <button
        className="flex items-center gap-3 min-w-0 w-[60%] max-lg:items-stretch max-sm:w-full text-left"
        role="button"
        onClick={() => onSelect(book)}
      >
        <div className="flex items-start gap-3 max-lg:flex-col">
          <div className="bg-primary rounded-[3px]">
            <span
              className="font-syne text-[25px] p-1 max-lg:p-0.5"
              aria-label={`Rank ${book.rank}`}
            >
              #{book.rank}
            </span>
          </div>
          {book.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              width={82}
              height={124}
              src={book.coverUrl}
              alt={book.title}
              className="rounded-md border border-foreground/20"
            />
          ) : (
            <div className="w-20.5 h-31 rounded-md bg-primary-600 flex items-center justify-center shrink-0 border border-foreground/20">
              <ImageIcon
                strokeWidth={1}
                className="text-foreground/30"
                size={34}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <div className="flex-1 cursor-pointer max-lg:flex max-lg:flex-col max-lg:justify-between">
          <div className="max-lg:mt-12">
            <h3 className="font-medium text-xl leading-none  max-xl:leading-tight max-lg:text-lg hover:underline">
              {book.title}
            </h3>
            <p className="text-foreground/80 mt-1 max-sm:text-sm">
              By {book.author}
            </p>
          </div>
          <div className="gap-5 hidden max-lg:flex">
            <span className="text-nowrap">{book.reads} reads</span>
            <span className="text-nowrap">{book.publishedYear}</span>
            <div className="flex items-center gap-1.5">
              <span>{book.rating}</span> <Star aria-hidden="true" />
            </div>
          </div>
        </div>
      </button>

      {/* SECOND DIV  */}
      <div className="flex gap-5 max-lg:hidden">
        <span className="text-nowrap">{book.reads} reads</span>
        <span className="text-nowrap">{book.publishedYear}</span>
        <div className="flex items-center gap-1.5">
          <span>{book.rating}</span> <Star />
        </div>
      </div>

      <Button
        text="Want to Read"
        loading={loading}
        className="px-3 py-2 text-nowrap max-sm:hidden"
        onClick={handleOnClickWantToRead}
      />
    </li>
  );
};

export default TrendingBookCard;
