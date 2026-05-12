import Image from "next/image";

const Features = () => {
  return (
    <section className="py-12" aria-labelledby="features-heading">
      <h2
        className="text-center text-[39px] max-sm:text-[31px] font-medium leading-tight"
        id="features-heading"
      >
        Everything a reader needs. Nothing they don&apos;t.
      </h2>
      <div className="mt-12">
        {/* FIRST ROW  */}
        <article className="flex justify-between bg-primary-350 gap-9 max-lg:flex-col">
          <div className="bg-primary-350">
            <h3 className="text-[25px] pl-4 max-sm:text-xl mt-6">
              Your Book Tracker
            </h3>
            <p className="leading-5.25 mt-3 pl-4">
              Every book you&apos;ve read, are reading, or can&apos;t wait to
              start. All in one place. Log it, update it, done.
            </p>
          </div>

          <div>
            <Image
              width={869}
              height={386}
              src={"/images/first-feature.png"}
              alt={"Book reading table with a form."}
            />
          </div>
        </article>
        {/* SECOND ROW  */}
        <div className="flex gap-6 mt-9 max-lg:flex-col">
          {/* first card  */}
          <article className="max-w-1/2 max-lg:max-w-full bg-primary-350">
            <h3 className="text-[25px] pl-4 max-sm:text-xl mt-6">
              Your Reading Dashboard
            </h3>
            <p className="leading-5.25 mt-3 max-w-139.75 line-clamp-2 pl-4">
              See your whole reading year at a glance. Everything from books
              finished, pace, genres, and streaks. The more you read, the more
              interesting it gets.
            </p>
            <div className="mt-10">
              <Image
                width={658}
                height={346}
                src={"/images/dashboard.png"}
                alt={"Dashboard showing your books."}
                className="w-full h-full object-cover"
              />
            </div>
          </article>
          {/* second card */}
          <article className="bg-primary-350">
            <h3 className="text-[25px] pl-4 max-sm:text-xl mt-6">
              Trending & Recommendations
            </h3>
            <p className="leading-5.25 mt-3 max-w-139.75 pl-4">
              Personalized picks based on what you&apos;ve actually read. The
              more you log, the smarter it gets.
            </p>
            <div className="mt-10">
              <Image
                width={658}
                height={346}
                src={"/images/recommendations.png"}
                alt={"Dashboard showing your books."}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Features;
