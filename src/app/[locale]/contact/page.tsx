import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Contact & Location — Le Chandelier | San José, Costa Rica",
    es: "Contacto y Ubicación — Le Chandelier | San José, Costa Rica"
  };

  const descriptions = {
    en: "Find Le Chandelier in Los Yoses, San José, Costa Rica. Get directions, contact information, and hours for Costa Rica's premier French-Swiss restaurant.",
    es: "Encuentre Le Chandelier en Los Yoses, San José, Costa Rica. Obtenga direcciones, información de contacto y horarios del restaurante franco-suizo premier de Costa Rica."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
  };
}


export default function Contact() {
  return (
    <div>
      <ContactSection />
    </div>
  );
}