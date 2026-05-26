"use client";
import Image from "next/image";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import Button from "./Button";

const HomePageNavbar = () => {
  return (
    <header className="sticky top-0 bg-hero z-50 bg-gradient-to-b from-[#e6ecf1] to-[#e6ecf1]/0 ">
      <nav
        className="flex items-center justify-between px-12.5 py-3 max-sm:px-5"
        aria-label="Main navigation"
      >
        <div>
          <Image
            width={112}
            height={26}
            src={"/svgs/dogear-logo-nav.svg"}
            alt={"Dogear logo"}
          />
        </div>

        <ul className="flex gap-4 max-sm:gap-2">
          <li>
            <SignUpButton mode="modal">
              <Button text="Sign up" />
            </SignUpButton>
          </li>
          <li>
            <SignInButton mode="modal">
              <Button text="Log in" className="bg-transparent hover:bg-transparent" />
            </SignInButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HomePageNavbar;
