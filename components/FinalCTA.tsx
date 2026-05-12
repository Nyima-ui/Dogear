'use client'
import { SignUpButton } from "@clerk/nextjs";
import Button from "./Button";

const FinalCTA = () => {
  return (
    <section className="bg-[url('/images/cta-background.png')] flex flex-col items-center gap-10 py-12 bg-no-repeat bg-contain bg-bottom-right px-5">
      <div className="flex flex-col items-center">
        <h3 className="text-[39px] text-center max-sm:text-2xl leading-tight">
          Every book you&apos;ve loved,{" "}
          <span className="text-primary font-semibold">finally logged.</span>
        </h3>
        <p className="text-center max-w-[528px] mt-4 max-sm:text-sm">
          Start logging, start discovering, and start having real conversations
          with the books you love. It only takes a minute to begin.
        </p>
      </div>
      <SignUpButton mode="modal">
        <Button text="Get Started With Dogear" />
      </SignUpButton>
    </section>
  );
};

export default FinalCTA;
