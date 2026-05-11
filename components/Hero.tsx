import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="bg-hero flex flex-col items-center py-12 px-5">
      <div className="max-w-185 flex flex-col items-center">
        <h1 className="text-[48px] font-medium leading-12.5 text-center max-sm:text-[31px] max-sm:leading-9">
          One Place to Track Every Book You&apos;ve Ever Read.
        </h1>
        <p className="mt-4 max-w-155 text-center max-sm:text-sm">
          Log what you&apos;re reading, rate what you&apos;ve finished, and let
          AI recommend what&apos;s next. Want to go deeper? Upload the book, ask
          it anything — type or speak out loud, and the book talks back.
        </p>
      </div>
      <Button text="Start Your Reading List" className="mt-8" />

      <div className="mt-8 relative">
        <Image
          width={134}
          height={90}
          src={"/svgs/reading-glasses.svg"}
          alt={"Reading glasses"}
          aria-hidden="true"
          className="absolute -top-11.25 -left-16.75 max-sm:w-22.5 max-sm:-top-8 max-sm:-left-12"
        />
        <Image
          width={1171}
          height={58}
          src={"/svgs/hero-image.svg"}
          alt={"Hero image"}
          className="relative z-10 max-md:hidden"
        />
        <Image
          width={481}
          height={177}
          src={"/svgs/hero-image--m.svg"}
          alt={"Hero image"}
          className="relative z-10 hidden max-md:block"
        />
        <Image
          width={179}
          height={112}
          src={"/svgs/reading-girl-vase.svg"}
          alt={"Reading girl"}
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-20 max-sm:w-30"
        />
      </div>
    </section>
  );
};

export default Hero;
