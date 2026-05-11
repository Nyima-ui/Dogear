'use client'
import Image from "next/image";
import { SignUpButton, SignInButton } from "@clerk/nextjs";

const HomePageNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-12.5 py-3 max-sm:px-5">
      <div>
        <Image
          width={112}
          height={26}
          src={"/dogear-logo-nav.svg"}
          alt={"Dogear logo"}
        />
      </div>

      <ul className="flex gap-4 max-sm:gap-2">
        <li>
          <SignUpButton mode="modal">
            <button className="bg-primary px-4 py-2 rounded-md cursor-pointer text-sm font-medium">
              Sign up
            </button>
          </SignUpButton>
        </li>
        <li>
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-md cursor-pointer text-sm font-medium">
              Log in
            </button>
          </SignInButton>
        </li>
      </ul>
    </nav>
  );
};

export default HomePageNavbar;
