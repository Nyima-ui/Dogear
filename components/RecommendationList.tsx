"use client";
import { EnrichedBook, IBook } from "@/types";
import RecommendationsCard from "./RecommendationsCard";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import StarRow from "./StarRow";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { toast } from "sonner";
import { addAsTBR } from "@/lib/actions/book.action";
import { useAuth } from "@clerk/nextjs";

const RecommendationList = ({ books }: { books: EnrichedBook[] }) => {
  const [selected, setSelected] = useState<EnrichedBook>(books[0]);
  const [expanded, setExpanded] = useState(false);
  const [isDecriptionOpen, setIsDecriptionOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  if (!userId) {
    // TODO: ask claude what do after this
    //send user to sign up page but my sign up is modal
    return;
  }

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

  const handleWantToRead = async (book: EnrichedBook) => {
    try {
      setLoading(true);
      const bookPayload: IBook = {
        clerkId: userId,
        title: book.title,
        author: book.author,
        status: "TBR",
        coverUrl: book.coverUrl ? book.coverUrl : "",
      };

      const result = await addAsTBR(bookPayload);

      if (!result.success) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success("Added to your reading list.");
    } catch (e) {
      console.error("Error adding the book as TBR on table", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-8 max-xl:gap-5 items-start w-full h-full justify-between max-md:h-[80vh]">
      {/* CARD CONTAINER  */}
      <div className="w-full">
        <ul className="space-y-3 h-full overflow-y-auto max-h-148.25 max-md:max-h-157.5">
          {books.map((b) => (
            <RecommendationsCard
              key={b._id}
              book={b}
              onClick={handleSelect}
              handleWantToRead={handleWantToRead}
            />
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
          `grow bg-card px-6 py-3 w-[70%] max-xl:w-[80%] shadow-sm rounded-md`,
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
          <p className="overflow-y-auto max-h-100">{displayDescription}</p>
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
          loading={loading}
          className="px-3 py-2 text-nowrap hidden max-sm:flex mt-5"
          onClick={() => handleWantToRead(selected)}
        />
      </div>
    </div>
  );
};

export default RecommendationList;
