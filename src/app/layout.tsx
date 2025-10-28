import type { Metadata } from "next";
import { Bodoni_Moda, Luxurious_Script, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Image from "next/image";
import StructuredData from "@/components/StructuredData";
import { generateRestaurantSchema, generateOrganizationSchema } from "@/lib/structured-data";
import "./globals.css";
import { ReactNode } from 'react';

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
  // ... rest of your metadata
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const restaurantSchema = generateRestaurantSchema({
    ratingValue: 4.8,
    reviewCount: 150,
  });
  const organizationSchema = generateOrganizationSchema();

  return (
    <html>
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
      </body>
    </html>
  );
}