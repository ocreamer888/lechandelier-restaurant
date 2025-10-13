import Hero3 from "@/components/Hero3";
import WhoWeAre from "@/components/WhoWeAre";
import TeamSection from "@/components/TeamSection";
import AwardsSection from "@/components/AwardsSection";
import MenuSection2 from "@/components/MenuSection2";
import EventSection3 from "@/components/EventSection3";
import DrinkSection from "@/components/DrinksSection";
import ContactSection2 from "@/components/ContactSection2";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero3 />
      <AwardsSection />
      <WhoWeAre />
      <MenuSection2 />
      <DrinkSection />
      <EventSection3 />
      <TeamSection />
      <ContactSection2 />

    </main>
  );
}
