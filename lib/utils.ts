import { IBookDocument, Segment } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { PDFDocumentProxy } from "pdfjs-dist";
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

export const splitIntoSegments = (
  text: string,
  segmentSize: number = 500,
  overlapSize: number = 50,
): Segment[] => {
  if (segmentSize <= 0) {
    throw new Error("segmentSize must be greater than 0");
  }
  if (overlapSize < 0 || overlapSize >= segmentSize) {
    throw new Error("overlapSize must be >= 0 and < segmentSize");
  }

  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const segments: Segment[] = [];

  let segmentIndex = 0;
  let startIndex = 0;

  while (startIndex < words.length) {
    const endIndex = Math.min(startIndex + segmentSize, words.length);
    const segmentWords = words.slice(startIndex, endIndex);
    const segmentText = segmentWords.join(" ");

    segments.push({
      text: segmentText,
      segmentIndex,
      wordCount: segmentWords.length,
    });

    segmentIndex++;

    if (endIndex >= words.length) break;
    startIndex = endIndex - overlapSize;
  }

  return segments;
};

export const extractPdfCover = async (pdf: PDFDocumentProxy): Promise<Blob> => {
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(`Could not get canvas context.`);
  }

  await page.render({ canvasContext: context, viewport, canvas }).promise;

  const coverBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      "image/png",
      1,
    );
  });

  return coverBlob;
};

export const parsePdf = async (file: File, extractCover: boolean = true) => {
  try {
    const pdfjsLib = await import("pdfjs-dist");

    if (typeof window !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
    }

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    // GET THE PDF COVER
    const coverBlob = extractCover ? await extractPdfCover(pdf) : null;

    // CHUNK THE PDF TEXT
    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter((item) => "str" in item)
        .map((item) => item.str)
        .join(" ");

      fullText += pageText + "\n";
    }

    const segments = splitIntoSegments(fullText);

    return {
      coverBlob,
      content: segments,
    };
  } catch (e) {
    console.error("Error parsing book pdf", e);
    throw new Error(
      `Failed to parse PDF file: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
};
