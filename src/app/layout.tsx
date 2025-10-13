import type { Metadata } from "next";
import { Bodoni_Moda, Luxurious_Script, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Image from "next/image";

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
  title: "Le Chandelier — French-Swiss Restaurant",
  description: "French-Swiss restaurant. Book a table, explore our menu, meet the team, and see events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodoni.variable} ${luxurious.variable} ${poppins.variable} antialiased font-pretty`}>
      <div className="absolute inset-0 -z-10 fixed">
      <Image
            src="/Le-Chandelier-BG.png"
            alt="Signature dish plated"
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