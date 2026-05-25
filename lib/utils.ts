import { IBookDocument } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //returnend date, e.g: 	March 18, 2026
};

export const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate2 = (date: Date | string | undefined): string => {
  if (!date) return "";

  const d = new Date(date);

  const day = d.getDate();
  const suffix = getDaySuffix(day);
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();

  return `${day}${suffix} ${month} ${year}`;

  //returnend date, e.g: 	12th May 2026
};

export const getDaysToComplete = (book: IBookDocument): string => {
  if (!book.startDate || !book.finishDate) return "N/A";

  const start = new Date(book.startDate);
  const finish = new Date(book.finishDate);
  const diffMs = finish.getTime() - start.getTime();

  if (diffMs < 0) return "N/A";
  
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (days < 7) return `${days} days`;
  if (days < 30) return `${Math.round(days / 7)} weeks`;
  return `${Math.round(days / 30)} months`;
};
