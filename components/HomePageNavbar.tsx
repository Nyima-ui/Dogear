"use client";
import Image from "next/image";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import Button from "./Button";

const HomePageNavbar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between px-12.5 py-3 max-sm:px-5">
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
              <Button text="Sign up"/>
            </SignUpButton>
          </li>
          <li>
            <SignInButton mode="modal">
              <Button text="Log in" className="bg-transparent"/>
            </SignInButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HomePageNavbar;
