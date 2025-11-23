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
    en: "Le Chandelier — Premier French-Swiss Restaurant in San José, Costa Rica",
    es: "Le Chandelier — Restaurante Franco-Suizo Premier en San José, Costa Rica"
  };

  const descriptions = {
    en: "Experience Le Chandelier, the premier French-Swiss restaurant in San José, Costa Rica. Masterfully crafted dishes, curated wines, and timeless elegance in the heart of Los Yoses. Reserve your table today.",
    es: "Experimente Le Chandelier, el restaurante franco-suizo premier en San José, Costa Rica. Platos magistralmente elaborados, vinos curados y elegancia atemporal en el corazón de Los Yoses. Reserve su mesa hoy."
  };

  const keywords = locale === 'es'
    ? [
      'restaurante Costa Rica',
      'restaurante francés San José',
      'restaurante fino Costa Rica',
      'Le Chandelier',
      'cocina francesa',
      'cocina suiza',
      'mejor restaurante San José',
      'restaurante elegante Costa Rica',
      'Los Yoses',
      'gastronomía fina',
    ]
    : [
      'restaurant Costa Rica',
      'French restaurant San José',
      'fine dining Costa Rica',
      'Le Chandelier',
      'French cuisine',
      'Swiss cuisine',
      'best restaurant San José',
      'elegant restaurant Costa Rica',
      'Los Yoses',
      'gourmet dining',
    ];

  return {
    metadataBase: new URL('https://www.lechandelier.restaurant'),
    title: titles[locale as keyof typeof titles] || titles.es,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
    keywords: keywords.join(', '),
    authors: [{ name: 'Le Chandelier Restaurant' }],
    creator: 'Le Chandelier',
    publisher: 'Le Chandelier Restaurant',

    alternates: {
      canonical: `https://www.lechandelier.restaurant/${locale}`,
      languages: {
        en: 'https://www.lechandelier.restaurant/en',
        es: 'https://www.lechandelier.restaurant/es',
      },
    },

    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CR' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_CR',
      url: `https://www.lechandelier.restaurant/${locale}`,
      title: titles[locale as keyof typeof titles] || titles.es,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
      siteName: 'Le Chandelier',
      images: [
        {
          url: 'https://www.lechandelier.restaurant/restaurante-le-chandelier-1.webp',
          width: 1200,
          height: 630,
          alt: 'Le Chandelier Restaurant - French-Swiss Fine Dining in Costa Rica',
        },
      ],
      countryName: 'Costa Rica',
    },

    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.es,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.es,
      images: ['https://www.lechandelier.restaurant/restaurante-le-chandelier-1.webp'],
      creator: '@lechandeliercr',
      site: '@lechandeliercr',
    },

    other: {
      'geo.region': 'CR-SJ',
      'geo.placename': 'San José',
      'geo.position': '9.9293391;-84.0589315',
      'ICBM': '9.9293391, -84.0589315',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    applicationName: 'Le Chandelier Restaurant',

    icons: {
      icon: '/Chandelier.png',
      apple: '/Chandelier.png',
    },
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