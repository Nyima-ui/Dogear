"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronsRight,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Status = "Reading" | "Finished" | "TBR" | "None";

const styleMapForStatus: Record<Status, string> = {
  Reading:
    "bg-[#E1E1FE] text-[#1E23FB] px-2 py-0.5 rounded-md cursor-pointer select-none",
  Finished:
    "bg-[#BBF7D1] text-[#157F3D] px-2 py-0.5 rounded-md cursor-pointer select-none",
  TBR: "bg-[#FDE689] text-[#D87706] px-2 py-0.5 rounded-md cursor-pointer select-none",
  None: "text-foreground/30",
};

const BookPanel = () => {
  const [isStatusDropDownOpened, setisStatusDropDownOpened] = useState(false);
  const [status, setStatus] = useState<Status>("None");

  return (
    <div className="bg-background fixed top-0 right-0 z-50 h-screen w-[752px] border-l border-black/20 p-3">
      <button className="p-1 rounded-md hover:bg-primary-600 cursor-pointer">
        <ChevronsRight strokeWidth={1.7} color="#363636" />
      </button>
      <form className="px-8 mt-6">
        {/* FIRST PART  */}
        <div className="flex gap-4">
          {/* IMAGE  */}
          <div className="w-[120px] h-[180px] bg-primary-600 rounded-md flex justify-center items-center">
            <ImageIcon
              strokeWidth={1}
              className="text-foreground/30"
              size={34}
            />
          </div>
          {/* INPUT FIELDS  */}
          <div className="grow">
            <div className="">
              <label htmlFor="book-title" className="sr-only">
                Book Title
              </label>
              <input
                type="text"
                id="book-title"
                name="book-title"
                placeholder="New title"
                className="text-xl w-full py-3 px-1 rounded-md placeholder:text-foreground border-b border-black/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="">
              <label htmlFor="book-author" className="sr-only">
                Book Author
              </label>
              <input
                type="text"
                id="book-author"
                name="book-author"
                placeholder="Author"
                className="text-sm w-full py-1.5 px-1 rounded-md border-b border-black/20 focus:outline-none focus:ring-1 focus:ring-primary mt-5"
              />
            </div>
          </div>
        </div>

        {/* SECOND PART  */}
        <div className="mt-8">
          {/* FIRST FIELD  */}
          <div className="flex items-center">
            <label htmlFor="status" className="w-[136px]">
              Status
            </label>

            <div
              className="border-b border-black/20 py-2 flex justify-between grow cursor-pointer relative"
              onClick={() => setisStatusDropDownOpened((p) => !p)}
            >
              <span className={cn(``, styleMapForStatus[status])}>
                {status === "None" ? "Reading" : status}
              </span>
              <span>
                {isStatusDropDownOpened ? (
                  <ChevronUp
                    size={22}
                    className="text-foreground"
                    strokeWidth={1.7}
                  />
                ) : (
                  <ChevronDown
                    size={22}
                    className="text-foreground"
                    strokeWidth={1.7}
                  />
                )}
              </span>
              {isStatusDropDownOpened && (
                <ul className="absolute top-full translate-y-1 left-0 bg-background w-full border rounded-md border-black/20 p-1 space-y-1.5 shadow-lg shadow-black/5">
                  <li className="hover:bg-primary-400">
                    <button
                      className="bg-[#E1E1FE] text-[#1E23FB] px-2 py-0.5 rounded-md cursor-pointer select-none"
                      onClick={() => setStatus("Reading")}
                    >
                      Reading
                    </button>
                  </li>
                  <li className="hover:bg-primary-400">
                    <button
                      className="bg-[#BBF7D1] text-[#157F3D] px-2 py-0.5 rounded-md cursor-pointer select-none"
                      onClick={() => setStatus("Finished")}
                    >
                      Finished
                    </button>
                  </li>
                  <li className="hover:bg-primary-400">
                    <button
                      className="bg-[#FDE689] text-[#D87706] px-2 py-0.5 rounded-md cursor-pointer select-none"
                      onClick={() => setStatus("TBR")}
                    >
                      TBR
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* SECOND FIELD  */}
          <div>
             <label htmlFor=""></label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookPanel;
