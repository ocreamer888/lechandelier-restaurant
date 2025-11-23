import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { Bodoni_Moda, Luxurious_Script, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Image from "next/image";
import StructuredData from "@/components/StructuredData";
import { generateRestaurantSchema, generateOrganizationSchema } from "@/lib/structured-data";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  style: ["normal", "italic"],
});

const luxurious = Luxurious_Script({
  variable: "--font-luxurious",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Le Chandelier — French-Swiss Restaurant in San José, Costa Rica",
    es: "Le Chandelier — Restaurante Franco-Suizo en San José, Costa Rica"
  };

  const descriptions = {
    en: "Le Chandelier illuminates Costa Rica with refined French-Swiss dining, masterfully crafted dishes, curated wines, and an ambiance of timeless elegance and warmth.",
    es: "Le Chandelier ilumina Costa Rica con dining Franco-Suizo refinado, platos elaborados magistralmente, vinos curados y un ambiente de elegancia atemporal y calidez."
  };

  return {
    metadataBase: new URL('https://www.lechandelier.restaurant'),
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  // Pass the locale to getMessages so it loads the correct translation file
  const messages = await getMessages({ locale });

  const restaurantSchema = generateRestaurantSchema({
    ratingValue: 4.6,
    reviewCount: 315,
  });
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${bodoni.variable} ${luxurious.variable} ${poppins.variable} antialiased font-pretty`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StructuredData data={restaurantSchema} />
          <StructuredData data={organizationSchema} />
          <Toaster position="top-center" richColors closeButton />
          <div className="absolute inset-0 -z-10 fixed">
            <Image
              src="/Le-Chandelier-BG.png"
              alt="Restaurant ambiance background"
              fill
              priority
              className="relative object-cover"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}