"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn, getPageTitle } from "@/lib/utils";
import { Search, Plus } from "lucide-react";
import BookPanel from "./BookPanel";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useBookPanel } from "@/contexts/BookPanelContext";
import React, { useCallback } from "react";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (e.target.value) {
        params.set("q", e.target.value);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },

    [pathname, router, searchParams],
  );

  const { isOpen, openForCreate, close, editingBook, isSaving } =
    useBookPanel();
    
  const formRef = useOutsideClick<HTMLDivElement>(
    isOpen,
    () => close(),
    isSaving,
  );

  return (
    <>
      <header>
        <h1 className="text-[31px] max-md:hidden">{title}</h1>

        <div className="flex justify-between mt-3 items-center max-md:flex-col max-md:items-start max-md:gap-6 max-md:mt-0">
          {/* NAV CAPSULES  */}
          <nav className="max-md:w-full">
            <ul className="flex max-md:justify-between overflow-auto py-1 gap-1.5">
              <li>
                <Link
                  href="/dashboard/log"
                  className={cn(
                    `px-2.5 py-1 bg-background inline-block max-sm:text-sm hover:opacity-70`,
                    title === "My library" &&
                      "shadow-[0px_2px_3px_1px] shadow-primary/25 rounded-2xl font-medium hover:opacity-100",
                  )}
                >
                  Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/discover"
                  className={cn(
                    `px-2.5 py-1 bg-background inline-block max-sm:text-sm hover:opacity-70 transition-opacity duration-100 ease-in`,
                    title === "For you" &&
                      "shadow-[0px_2px_3px_1px] shadow-primary/25 rounded-2xl font-medium hover:opacity-100",
                  )}
                >
                  Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/trending"
                  className={cn(
                    `px-2.5 py-1 bg-background inline-block max-sm:text-sm hover:opacity-70 transition-opacity duration-100 ease-in`,
                    title === "Trending books" &&
                      "shadow-[0px_2px_3px_1px] shadow-primary/25 rounded-2xl font-medium hover:opacity-100",
                  )}
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/overview"
                  className={cn(
                    `px-2.5 py-1 bg-background inline-block max-sm:text-sm hover:opacity-70 transition-opacity duration-100 ease-in`,
                    title === "Reading overview" &&
                      "shadow-[0px_2px_3px_1px] shadow-primary/25 rounded-2xl font-medium hover:opacity-100",
                  )}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          {/* SEARCH BOX  */}
          {pathname === "/dashboard/log" && (
            <div className="flex items-center gap-2 w-full max-w-79 max-md:max-w-none">
              <form className="flex items-center w-full max-w-79 max-md:max-w-none">
                <div className="flex gap-2 focus-within:ring-1 focus-within:ring-foreground/60 rounded-2xl items-center p-1 w-full">
                  <label htmlFor="search-book" className="sr-only">
                    Search book
                  </label>
                  <span>
                    <Search strokeWidth={1.7} color="#AFAFAF" size={22} />
                  </span>
                  <input
                    type="text"
                    id="search-book"
                    name="search-book"
                    placeholder="Search book"
                    className="focus:outline-none w-full"
                    onChange={handleSearch}
                  />
                </div>
              </form>

              <button
                className="flex bg-primary items-center gap-1 self-start px-3 py-1 rounded-md cursor-pointer active:scale-102"
                onClick={openForCreate}
              >
                <span className="font-medium">New</span>
                <span>
                  <Plus strokeWidth={2.5} color="#363636" size={15} />
                </span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div
        ref={formRef}
        className={cn(
          `bg-background fixed top-0 right-0 z-50 h-screen overflow-y-auto w-188 border-l border-black/20 p-3 transition-transform duration-300 ease-out pb-10`,
          isOpen ? "translate-x-0" : "translate-x-full",
          "max-md:w-full max-sm:px-5",
        )}
      >
        {isOpen && (
          <BookPanel
            isOpen={isOpen}
            onClose={close}
            initialData={editingBook}
          />
        )}
      </div>
    </>
  );
};

export default DashboardNavbar;
