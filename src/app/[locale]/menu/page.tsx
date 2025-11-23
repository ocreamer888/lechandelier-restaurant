import MenuHero2 from "@/components/Menu/MenuHero2";
import Menu3Wrapper from "@/components/Menu3Wrapper";
import DrinksSectionWrapper from "@/components/DrinksSectionWrapper";
import ContactSection2Wrapper from "@/components/ContactSection2Wrapper";
import MenuStructuredData from "@/components/MenuStructuredData";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Menu — Le Chandelier French-Swiss Cuisine | San José, Costa Rica",
    es: "Menú — Cocina Franco-Suiza Le Chandelier | San José, Costa Rica"
  };

  const descriptions = {
    en: "Explore Le Chandelier's exquisite French-Swiss menu featuring seasonal ingredients, classic techniques, and innovative cuisine. Fine dining in San José, Costa Rica.",
    es: "Explore el exquisito menú franco-suizo de Le Chandelier con ingredientes de temporada, técnicas clásicas y cocina innovadora. Gastronomía fina en San José, Costa Rica."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
  };
}


export default function Menu() {
  return (
    <div>
      <MenuStructuredData />
      <MenuHero2 />
      <Menu3Wrapper />
      <DrinksSectionWrapper />
      <ContactSection2Wrapper />
    </div>
  );
}