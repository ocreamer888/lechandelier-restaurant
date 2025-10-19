import type { Metadata } from "next";
import { Bodoni_Moda, Luxurious_Script, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lechandelier.restaurant'),
  title: "Le Chandelier — French-Swiss Restaurant in San José, Costa Rica",
  description: "Le Chandelier illuminates Costa Rica with refined French-Swiss dining, masterfully crafted dishes, curated wines, and an ambiance of timeless elegance and warmth.",
  keywords: [
    "Le Chandelier",
    "French-Swiss restaurant",
    "Fine dining San José",
    "Costa Rica restaurants",
    "French cuisine Costa Rica"
  ],
  authors: [{ name: "Le Chandelier", url: "https://www.lechandelier.restaurant" }],
  creator: "Le Chandelier",
  publisher: "Le Chandelier",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Le Chandelier — French-Swiss Restaurant in San José, Costa Rica",
    description: "Le Chandelier illuminates Costa Rica with refined French-Swiss dining, masterfully crafted dishes, curated wines, and an ambiance of timeless elegance and warmth.",
    type: "website",
    locale: "en",
    siteName: "Le Chandelier",
    url: "https://www.lechandelier.restaurant",
    images: [
      {
        url: "/restaurante-le-chandelier-1.webp",
        width: 1200,
        height: 630,
        alt: "Le Chandelier elegant restaurant interior in San José, Costa Rica",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Le Chandelier — French-Swiss Restaurant in San José, Costa Rica",
    description: "Le Chandelier illuminates Costa Rica with refined French-Swiss dining, masterfully crafted dishes, curated wines, and an ambiance of timeless elegance and warmth.",
    images: ["/restaurante-le-chandelier-1.webp"],
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for SEO
  // Add your actual rating values here if available
  const restaurantSchema = generateRestaurantSchema({
    ratingValue: 4.8,
    reviewCount: 150,
  });
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en">
      <body className={`${bodoni.variable} ${luxurious.variable} ${poppins.variable} antialiased font-pretty`}>
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
        <Footer />
      </body>
    </html>
  );
}