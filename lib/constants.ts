import { Status } from "@/types";

export const titleMap: Record<string, string> = {
  "/dashboard/log": "My library",
  "/dashboard/discover": "For you",
  "/dashboard/overview": "Reading overview",
  "/dashboard/trending": "Trending books",
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