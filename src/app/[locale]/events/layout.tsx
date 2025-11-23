import type { Metadata } from "next";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;

    const titles = {
        en: "Private Events — Le Chandelier French-Swiss Restaurant | Costa Rica",
        es: "Eventos Privados — Restaurante Franco-Suizo Le Chandelier | Costa Rica"
    };

    const descriptions = {
        en: "Host your private event at Le Chandelier. From corporate gatherings to intimate celebrations, experience French-Swiss elegance in San José, Costa Rica.",
        es: "Organice su evento privado en Le Chandelier. Desde reuniones corporativas hasta celebraciones íntimas, experimente la elegancia franco-suiza en San José, Costa Rica."
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.es,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    };
}

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
