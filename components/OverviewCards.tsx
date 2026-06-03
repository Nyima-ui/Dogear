import { IBookDocument } from "@/types";
import Image from "next/image";
import { CalendarCheck, Image as ImageIcon } from "lucide-react";
import { formatDate2, getDaysToComplete } from "@/lib/utils";
import StarRow from "./StarRow";

const OverviewCards = ({ books }: { books: IBookDocument[] }) => {
  const currentlyReading = books?.filter((b) => b.status === "Reading");
  const finishedReading = books?.filter((b) => b.status === "Finished");

  const ratedBooks = finishedReading.filter((b) => b.rating);

  const averageRating =
    ratedBooks.length > 0
      ? ratedBooks.reduce((sum, b) => sum + (b.rating ?? 0), 0) /
        ratedBooks.length
      : 0;

  return (
    <div className="mt-5 flex gap-3 flex-wrap">
      {/* FIRST CARD  */}
      <div className="border border-primary/30 rounded-md bg-primary-400 px-6 py-4 grow max-h-76.5 overflow-y-auto chart-scroll">
        <h3 className="text-xl text-foreground/80">Currently reading:</h3>
        <ul className="space-y-4 mt-4">
          {currentlyReading.map((b) => (
            <li key={b._id} className="flex gap-4">
              {b.coverUrl ? (
                <Image
                  width={72}
                  height={108}
                  src={b.coverUrl}
                  alt={b.title}
                  className="rounded-md"
                />
              ) : (
                <div className="w-18 h-27 rounded-md bg-primary-600 flex items-center justify-center shrink-0 border border-foreground/20">
                  <ImageIcon
                    strokeWidth={1}
                    className="text-foreground/30"
                    size={34}
                  />
                </div>
              )}

              <div>
                <h4>{b.title}</h4>
                <p className="text-foreground/60 text-sm">By {b.author}</p>
                <div className="flex items-center gap-1.5 mt-4">
                  <span>
                    <CalendarCheck className="text-foreground/70" size={16} />
                  </span>
                  <span className="text-sm text-foreground/70">
                    Started at: {formatDate2(b.startDate)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* SECOND CARD  */}
      <div className="border border-primary/30 rounded-md bg-primary-400 px-6 py-4 grow flex flex-col justify-between max-h-76.5 overflow-y-auto chart-scroll">
        <div className="flex flex-col items-center">
          <h3 className="text-[33px]">{finishedReading.length}</h3>
          <p className="mt-1">Books read this year</p>
          {/* Stacked Book Covers  */}
          <div className="relative flex w-28.5 h-20 mt-3 items-center justify-center">
            {finishedReading.slice(0, 3).map((b, i) => {
              const rotations = [-8, 2, 12];
              const zIndexes = [10, 20, 30];
              const translateX = [-16, 0, 16];

              return b.coverUrl ? (
                <Image
                  key={b._id}
                  width={50}
                  height={75}
                  src={b.coverUrl}
                  alt={b.title}
                  className="absolute rounded-sm shadow-md"
                  style={{
                    transform: `rotate(${rotations[i]}deg) translateX(${translateX[i]}px)`,
                    zIndex: zIndexes[i],
                  }}
                />
              ) : (
                <div key={b._id}></div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-[33px]">{averageRating}</h3>
          <div className="flex gap-1 scale-105">
            <StarRow count={Math.round(averageRating)} />
          </div>
          <p className="mt-3">Average rating</p>
        </div>
      </div>
      {/* THIRD CARD  */}
      <div className="border border-primary/30 rounded-md bg-primary-400 px-6 py-4 grow flex flex-col justify-between max-h-76.5 overflow-y-auto chart-scroll">
        <h3 className="text-xl text-foreground/80">Finished in:</h3>

        <ul className="mt-6 space-y-4">
          {finishedReading.map((b) => (
            <li key={b._id}>
              <div className="flex justify-between gap-2 items-center">
                <h4 className="w-50 leading-tight">{b.title}</h4>
                <div className="flex items-center grow">
                  <span className="inline-block w-full border border-dashed border-primary" />
                </div>
                <div className="w-20 text-nowrap">{getDaysToComplete(b)}</div>
              </div>
              <p className="text-sm text-foreground/60">By {b.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewCards;
