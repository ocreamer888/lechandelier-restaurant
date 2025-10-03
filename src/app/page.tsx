import Hero3 from "@/components/Hero3";
import WhoWeAre from "@/components/WhoWeAre";
import DrinksSection from "@/components/DrinksSection";
import TeamSection from "@/components/TeamSection";
import Menu2 from "@/components/Menu2";
import EventSection2 from "@/components/EventSection2";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero3 />
      <WhoWeAre />
      <Menu2 />
      <DrinksSection />
      <TeamSection />
      <EventSection2 />
    </main>
  );
}
