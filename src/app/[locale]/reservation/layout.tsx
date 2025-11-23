import type { Metadata } from "next";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;

    const titles = {
        en: "Reserve a Table — Le Chandelier | San José, Costa Rica",
        es: "Reservar Mesa — Le Chandelier | San José, Costa Rica"
    };

    const descriptions = {
        en: "Reserve your table at Le Chandelier, San José's premier French-Swiss restaurant. Easy online booking for the finest dining experience in Costa Rica.",
        es: "Reserve su mesa en Le Chandelier, el restaurante franco-suizo premier de San José. Reservación en línea fácil para la mejor experiencia gastronómica en Costa Rica."
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.es,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    };
}

export default function ReservationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
