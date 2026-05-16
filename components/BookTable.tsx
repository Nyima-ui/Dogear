"use client";
import { IBookDocument } from "@/types";
import { formatDate } from "@/lib/utils";
import { Square } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { styleMapForRating, styleMapForStatus } from "@/lib/constants";
import Star from "@/public/svgs/Star";

const BookTable = ({ books }: { books: IBookDocument[] }) => {
  console.log(books);
  return (
    <div className="overflow-x-auto h-[80vh] mt-3 w-full">
      <table
        className={cn(
          `min-w-max border border-black/20 w-full bg-background rounded-md border-separate border-spacing-0 text-sm`,
          "[&_td]:border-b [&_td]:border-black/20 [&_tr:last-child_td]:border-b-0 [&_thead_th]:py-4 [&_thead_th]:font-medium [&_thead_th]:text-left [&_thead_th]:border-b [&_thead_th]:border-black/20 [&_thead_th]:text-foreground/80 overflow-y-auto",
        )}
      >
        {/* TABLE HEADING ROW  */}
        <thead className="bg-primary-600">
          <tr>
            <th className="w-12">
              <button className="w-full flex justify-center cursor-pointer">
                <Square strokeWidth={1} color="#2A2A2A" size={16} />
              </button>
            </th>
            <th className="w-[168px]">Title</th>
            <th className="w-[128px]">Author</th>
            <th className="w-[104px]">Status</th>
            <th className="w-[142px]">Start date</th>
            <th className="w-[142px]">Finish date</th>
            <th className="w-[120px]">Rating</th>
            <th className="w-[300px]">Review</th>
            <th className="text-center! w-30">Cover</th>
          </tr>
        </thead>

        {/* TABLE BODY  */}
        <tbody>
          {books.map((b) => (
            <tr key={b._id} className="border-b border-black">
              <td className="py-4">
                <button className="flex justify-center w-full cursor-pointer">
                  <Square strokeWidth={1} color="#2A2A2A" size={16} />
                </button>
              </td>
              <td className="font-medium">{b.title}</td>
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
                    <div className="w-5 h-7.75 bg-amber-400"></div>
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
