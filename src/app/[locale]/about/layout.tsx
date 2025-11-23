import type { Metadata } from "next";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;

    const titles = {
        en: "About Us — Le Chandelier French-Swiss Restaurant | Costa Rica",
        es: "Sobre Nosotros — Restaurante Franco-Suizo Le Chandelier | Costa Rica"
    };

    const descriptions = {
        en: "Discover the story of Le Chandelier, Costa Rica's finest French-Swiss restaurant. Learn about our chefs, philosophy, and commitment to culinary excellence in San José.",
        es: "Descubra la historia de Le Chandelier, el mejor restaurante franco-suizo de Costa Rica. Conozca a nuestros chefs, filosofía y compromiso con la excelencia culinaria en San José."
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.es,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    };
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
