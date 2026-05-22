"use client";
import { EnrichedBook } from "@/types";
import RecommendationsCard from "./RecommendationsCard";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import StarRow from "./StarRow";
import { cn } from "@/lib/utils";
import Button from "./Button";

const RecommendationList = ({ books }: { books: EnrichedBook[] }) => {
  const [selected, setSelected] = useState<EnrichedBook>(books[0]);
  const [expanded, setExpanded] = useState(false);
  const [isDecriptionOpen, setIsDecriptionOpen] = useState(true);

  const CHAR_LIMIT = 400;
  const isLong = (selected.description?.length ?? 0) > CHAR_LIMIT;
  const displayDescription =
    expanded || !isLong
      ? selected.description
      : `${selected.description?.slice(0, CHAR_LIMIT)}...`;

  const handleSelect = (book: EnrichedBook) => {
    setSelected(book);
    setExpanded(false);
    setIsDecriptionOpen(true);
  };

  return (
    <div className="flex gap-12 max-xl:gap-5 items-start w-full">
      <div>
        <ul className="space-y-3">
          {books.map((b) => (
            <RecommendationsCard key={b._id} book={b} onClick={handleSelect} />
          ))}
        </ul>
      </div>

      {isDecriptionOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 hidden max-lg:block backdrop-blur-xs"
          onClick={() => setIsDecriptionOpen(false)}
        />
      )}

      <div
        aria-hidden={!isDecriptionOpen}
        className={cn(
          `grow bg-card px-6 py-3 w-[50%] max-xl:w-[60%] shadow-sm rounded-md`,
          `max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:w-full z-20 max-lg:pb-10`,
          `max-lg:translate-y-full ${isDecriptionOpen && "max-lg:translate-y-0"} max-lg:transition-transform duration-150 ease-in`,
        )}
      >
        <div className="w-52 h-1 bg-primary-700/70 mx-auto rounded-full hidden max-lg:block mb-5"></div>
        {/* HEAD  */}
        <div className="flex gap-6 items-center">
          {selected.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              width={82}
              height={124}
              src={selected.coverUrl}
              alt={selected.title}
              className="rounded-md border border-foreground/20"
            />
          ) : (
            <div className="w-20.5 h-31 rounded-md bg-primary-600 flex items-center justify-center shrink-0 border border-foreground/20">
              <ImageIcon
                strokeWidth={1}
                className="text-foreground/30"
                size={34}
              />
            </div>
          )}
          <div>
            <h3 className="font-medium text-xl leading-tight max-w-124">
              {selected.title}
            </h3>
            <p className="text-foreground/80 mt-1">By {selected.author}</p>
            <div className="flex items-center gap-1 mt-5">
              <span className="flex items-center p-1 gap-0.5">
                <StarRow count={Math.round(selected.rating ?? 0)} />
              </span>
              <span className="text-sm">{selected.rating}</span>
            </div>
          </div>
        </div>
        {/* BODY  */}
        <div className="mt-6">
          <p className="max-sm:max-h-100 overflow-y-auto">
            {displayDescription}
          </p>
          {isLong && (
            <button
              className="cursor-pointer text-sm mt-1 hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
        
        <Button
          text="Want to Read"
          className="px-3 py-2 text-nowrap hidden max-sm:block mt-5"
        />
      </div>
    </div>
  );
};

export default RecommendationList;
