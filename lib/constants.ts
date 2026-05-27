import { Status } from "@/types";
import { FetchGeminiRecommendationPromptProps } from "@/types";
import { VoiceOptions } from "@/types";

export const titleMap: Record<string, string> = {
  "/dashboard/log": "My library",
  "/dashboard/discover": "For you",
  "/dashboard/overview": "Reading overview",
  "/dashboard/trending": "Trending books",
  "/reader/new": "",
  "/reader/chat": "Book chat",
  "/reader/uploads": "My uploads",
};

export const styleMapForStatus: Record<Status, string> = {
  Reading:
    "bg-[#E1E1FE] text-[#1E23FB] px-2 py-0.5 rounded-md cursor-pointer select-none text-sm",
  Finished:
    "bg-[#BBF7D1] text-[#157F3D] px-2 py-0.5 rounded-md cursor-pointer select-none text-sm",
  TBR: "bg-[#FDE689] text-[#D87706] px-2 py-0.5 rounded-md cursor-pointer select-none text-sm",
  None: "text-foreground/30 py-0.5 text-sm",
};

export const styleMapForRating: Record<number, string> = {
  5: "flex p-1 rounded-md bg-[#E1E1FD] gap-0.5 w-fit",
  4: "flex p-1 rounded-md bg-[#DCFCE7] gap-0.5 w-fit",
  3: "flex p-1 rounded-md bg-[#FFE0B2] gap-0.5 w-fit",
  2: "flex p-1 rounded-md bg-[#FFF2C8] gap-0.5 w-fit",
  1: "flex p-1 rounded-md bg-[#FEE2E1] gap-0.5 w-fit",
};

export const fetchGeminiRecommendationPrompt = ({
  readBooks,
  reading,
  tbrBooks,
}: FetchGeminiRecommendationPromptProps) => {
  return `You are a personalized book recommendation engine.

Already read:
${readBooks.map((b) => `- "${b.title}" by ${b.author}${b.rating ? ` (rated ${b.rating}/5)` : ""}${b.review ? ` — "${b.review}"` : ""}`).join("\n") || "None yet"}

Currently reading:
${reading.map((b) => `- "${b.title}" by ${b.author}`).join("\n") || "Nothing"}

To-Be-Read list:
${tbrBooks.map((b) => `- "${b.title}" by ${b.author}`).join("\n") || "Empty"}

Recommend 5 books this reader hasn't read yet, based on their taste.
Respond ONLY with a JSON array, no markdown, no extra text.
Format: [{ "title": "", "author": "", "reason": "", "genre": "" }]`;
};

export const hardCoverQuery = `query TrendingBooks {
  books(
    limit: 20
    order_by: { users_read_count: desc }
  ) {
    title
    description
    rating
    users_read_count
    image {
      url
    }
    contributions {
      author {
        name
      }
    }
    editions(
      limit: 1
      order_by: { release_date: asc }
    ) {
      release_date
    }
  }
}`;

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const voiceOptions: Record<string, VoiceOptions> = {
  adam: {
    id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    description: "Dominant, Firm",
  },
  bella: {
    id: "hpp4J3VqNfWAUOO0d1Us",
    name: "Bella",
    description: "Professional, Bright, Warm",
  },
  will: {
    id: "bIHbv24MWmeRgasZH58o",
    name: "Will",
    description: "Relaxed Optimist",
  },
};
