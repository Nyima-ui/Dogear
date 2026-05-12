import Image from "next/image";

const AIfeatures = () => {
  return (
    <section className="py-12 max-sm:py-10" aria-labelledby="features-heading">
      <h2
        className="text-center text-[39px] max-sm:text-[25px] font-medium leading-tight"
        id="features-heading"
      >
        Talk to Your Books.
      </h2>

      <div className="mt-12 max-sm:mt-6">
        {/* FIRST ROW  */}
        <article className="flex justify-between bg-primary-350 gap-9 max-lg:flex-col">
          <div className="bg-primary-350">
            <h3 className="text-[25px] pl-4 max-sm:text-xl mt-6">
              Upload any PDF
            </h3>
            <p className="leading-5.25 mt-3 pl-4 max-w-110">
              Drop in the book&apos;s PDF and Dogear indexes it instantly. No
              setup needed at all.
            </p>
          </div>

          <div>
            <Image
              width={689}
              height={538}
              src={"/images/upload.png"}
              alt={"Book reading table with a form."}
              className="w-full h-full object-cover"
            />
          </div>
        </article>
        {/* SECOND ROW */}
        <article className="flex bg-primary-350 max-lg:flex-col-reverse mt-6 max-lg:gap-9">
          <div>
            <Image
              width={689}
              height={538}
              src={"/images/chat.png"}
              alt={"Book reading table with a form."}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-primary-350">
            <h3 className="text-[25px] pl-4 max-sm:text-xl mt-6">
              Type or speak
            </h3>
            <p className="leading-5.25 mt-3 pl-4 max-w-120">
              Ask questions by typing, or use voice. Easily choose the AI voice
              you want to speak with.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AIfeatures;
