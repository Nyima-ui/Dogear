"use client";
import Image from "next/image";
import { Table2, Sparkles, PanelLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SidebarNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* DESKTOP SIDEBAR NAVIGATION */}
      <nav
        className="border border-r-stroke w-fit h-screen flex flex-col items-center gap-25 px-1.5 max-md:hidden"
        aria-label="Desktop navigaton"
      >
        <Link href="/dashboard/log" className="mt-8 relative group">
          <Image
            width={40}
            height={40}
            src={"/svgs/books.svg"}
            alt={"Books icon"}
          />
          <span className="absolute px-1.5 py-1 rounded-md bg-[#414241] text-background text-xs top-1.5 left-[calc(100%+3px)] text-nowrap hidden group-hover:block">
            Home
          </span>
        </Link>
        <ul className="flex flex-col items-center gap-7">
          <li className="relative group">
            <Link
              href={"#"}
              className="p-1 rounded-md hover:bg-primary-600 inline-block"
            >
              <Table2 strokeWidth={1.7} color="#363636" />
            </Link>
            <span className="absolute px-1.5 py-1 rounded-md bg-[#414241] text-background text-xs top-1.5 left-[calc(100%+5px)] text-nowrap hidden group-hover:block">
              Library
            </span>
          </li>
          <li className="relative group">
            <Link
              href={"#"}
              className="p-1 rounded-md hover:bg-primary-600 inline-block"
            >
              <Sparkles strokeWidth={1.7} color="#363636" />
            </Link>
            <span className="absolute px-1.5 py-1 rounded-md bg-[#414241] text-background text-xs top-1.5 left-[calc(100%+5px)] text-nowrap hidden group-hover:block">
              Ask Dogear
            </span>
          </li>
        </ul>
      </nav>

      {/* MOBILE SIDEBAR NAVIGATION  */}
      <button
        className="p-1 rounded-md cursor-pointer hover:bg-primary-600 hidden max-md:block"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <PanelLeft strokeWidth={1.7} color="#5e5e5e" size={22} />
      </button>

      <nav
        className="hidden max-md:block"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div
          className={cn(
            "fixed inset-0 z-40 backdrop-blur-sm bg-black/10 transition-all duration-150",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            `fixed top-0 left-0 h-screen overflow-hidden transition-[width] duration-150 ease-linear z-50 border border-r-stroke`,
            open ? "w-[288px]" : "w-0",
          )}
        >
          <div
            className={cn(
              `bg-background w-full px-2 h-screen space-y-8 py-3 transition-opacity duration-150 ease-linear`,
            )}
          >
            <div
              className={cn(
                `flex justify-between items-center`,
                open ? "opacity-100" : "opacity-0",
              )}
            >
              <Link
                href={"/dashboard/log"}
                className="translate-y-0 inline-block"
              >
                <Image
                  width={96}
                  height={22}
                  src={"/svgs/dogear-logo-nav.svg"}
                  alt={"Books icon"}
                />
              </Link>

              <button
                className="p-1 rounded-md cursor-pointer hover:bg-primary-600"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <PanelLeft strokeWidth={1.7} color="#5e5e5e" size={22} />
              </button>
            </div>

            <ul className={cn(`space-y-3`, open ? "opacity-100" : "opacity-0")}>
              <li>
                <Link
                  href={"#"}
                  className="flex items-center gap-2 hover:bg-primary-600"
                >
                  <span className="p-1 rounded-md inline-block">
                    <Table2 strokeWidth={1.7} color="#363636" />
                  </span>
                  <span className="text-nowrap">Library</span>
                </Link>
              </li>

              <li>
                <Link
                  href={"#"}
                  className="flex items-center gap-2 hover:bg-primary-600"
                >
                  <span className="p-1 rounded-md inline-block">
                    <Sparkles strokeWidth={1.7} color="#363636" />
                  </span>
                  <span className="text-nowrap">Ask Dogear</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SidebarNav;
