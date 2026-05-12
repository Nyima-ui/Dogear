import AIfeatures from "@/components/AIfeatures";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="px-12.5 max-sm:px-5">
        <Features />
        <AIfeatures />
      </div>
      <FinalCTA />
    </main>
  );
}
