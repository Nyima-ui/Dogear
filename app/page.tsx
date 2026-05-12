import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="px-12.5 max-sm:px-5">
        <Features />
      </div>
    </main>
  );
}
