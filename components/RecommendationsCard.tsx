"use client";
import { EnrichedBook, IBook } from "@/types";
import Button from "./Button";
import { Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { addAsTBR } from "@/lib/actions/book.action";

const RecommendationsCard = ({
  book,
  onClick,
}: {
  book: EnrichedBook;
  onClick: (val: EnrichedBook) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  if (!userId) {
    // TODO: ask claude what do after this
    //send user to sign up page but my sign up is modal
    return;
  }

  const handleWantToRead = async () => {
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
    <li className="bg-card  flex items-center justify-between px-6 py-4 rounded-md gap-6 hover:shadow-md hover:shadow-primary-700/20 hover:bg-primary-500/70 transition-all duration-150 ease-in max-sm:px-3">
      <div
        className="flex items-center gap-6 max-sm:gap-3 cursor-pointer"
        role="button"
        onClick={() => onClick(book)}
      >
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
            />
          </div>
        )}
        <div>
          <h3 className="font-medium text-xl leading-none line-clamp-1 max-xl:line-clamp-2 max-xl:leading-tight max-sm:text-base hover:underline">
            {book.title}
          </h3>
          <p className="text-foreground/80 mt-1 max-sm:text-sm">
            By {book.author}
          </p>
        </div>
      </div>

      <Button
        text="Want to Read"
        loading={loading}
        className="px-3 py-2 text-nowrap max-sm:hidden"
        onClick={handleWantToRead}
      />
    </li>
  );
};

export default RecommendationsCard;
