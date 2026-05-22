import { EnrichedBook } from "@/types";
import Button from "./Button";
import { Image as ImageIcon } from "lucide-react";

const RecommendationsCard = ({
  book,
  onClick,
}: {
  book: EnrichedBook;
  onClick: (val: EnrichedBook) => void;
}) => {
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
          <h3 className="font-medium text-xl leading-none line-clamp-1 max-xl:line-clamp-2 max-xl:leading-tight max-sm:text-base">
            {book.title}
          </h3>
          <p className="text-foreground/80 mt-1 max-sm:text-sm">
            By {book.author}
          </p>
        </div>
      </div>

      <Button
        text="Want to Read"
        className="px-3 py-2 text-nowrap max-sm:hidden"
      />
    </li>
  );
};

export default RecommendationsCard;
