import Hero3 from "@/components/Hero3";
import WhoWeAre from "@/components/WhoWeAre";
import TeamSection from "@/components/TeamSection";
import EventSection2 from "@/components/EventSection2";
import AwardsSection from "@/components/AwardsSection";
import MenuSection2 from "@/components/MenuSection2";
import DrinkSection2 from "@/components/DrinkSection2";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero3 />
      <AwardsSection />
      <WhoWeAre />
      <MenuSection2 />
      <DrinkSection2 />
      <TeamSection />
      <EventSection2 />
    </main>
  );
}
