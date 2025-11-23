import Hero3 from "@/components/Hero3";
import WhoWeAre from "@/components/WhoWeAre";
import TeamSection from "@/components/TeamSection";
import AwardsSection from "@/components/AwardsSection";
import MenuSection2 from "@/components/MenuSection2";
import ContactSection2Wrapper from "@/components/ContactSection2Wrapper";
import DrinksSection3 from "@/components/DrinkSection3";
import FAQSchema from "@/components/FAQSchema";
import AIOptimization from "@/components/AIOptimization";
import type { Metadata } from "next";



export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Le Chandelier — Premier French-Swiss Restaurant in San José, Costa Rica",
    es: "Le Chandelier — Restaurante Franco-Suizo Premier en San José, Costa Rica"
  };

  const descriptions = {
    en: "Experience Le Chandelier, the premier French-Swiss restaurant in San José, Costa Rica. Masterfully crafted dishes, curated wines, and timeless elegance in the heart of Los Yoses. Reserve your table today.",
    es: "Experimente Le Chandelier, el restaurante franco-suizo premier en San José, Costa Rica. Platos magistralmente elaborados, vinos curados y elegancia atemporal en el corazón de Los Yoses. Reserve su mesa hoy."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
  };
}


export default function Home() {
  return (
    <main className="min-h-screen">
      <FAQSchema />
      <AIOptimization />
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


