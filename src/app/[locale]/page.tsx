import Hero3 from "@/components/Hero3";
import WhoWeAre from "@/components/WhoWeAre";
import TeamSection from "@/components/TeamSection";
import AwardsSection from "@/components/AwardsSection";
import MenuSection2 from "@/components/MenuSection2";
import ContactSection2Wrapper from "@/components/ContactSection2Wrapper";
import DrinksSection3 from "@/components/DrinkSection3";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero3 />
      <AwardsSection />
      <WhoWeAre />
      <MenuSection2 />
      <DrinksSection3 />
      <TeamSection />
      <ContactSection2Wrapper />
    </main>
  );
}
