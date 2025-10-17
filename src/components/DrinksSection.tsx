"use client";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import DrinksMenu from "./DrinksMenu";

type DrinksSectionProps = {
  featuredDrink?: {
    title: string;
    description: string;
    imageUrl?: string;
  };
};

export default function DrinksSection({ featuredDrink }: DrinksSectionProps = {}) {
  // Fallback data
  const drinkTitle = featuredDrink?.title || "House Sangria";
  const drinkDescription = featuredDrink?.description || "Our signature sangria crafted with premium red wine, fresh seasonal fruits, and a touch of brandy. Perfect for sharing.";
  const drinkImage = featuredDrink?.imageUrl || "/sangria-le-chandelier-2.png";

  return (
    <section className="section" id="drinks">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHeading
            title="Drinks"
            subtitle="An exquisite selection of champagnes and fine wines from around the world."
          />

        <DrinksMenu />
        </div>
        <div className="grid gap-4 items-center justify-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <Image src={drinkImage} alt={drinkTitle} fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
          </div>
          <article className="rounded-3xl bg-gradient-to-br from-pink-200/60 to-pink-200/40 p-6">
            <h4 className="text-5xl font-script">{drinkTitle}</h4>
            <p className="mt-2 text-sm text-white/80">
              {drinkDescription}
            </p>
          </article>
        </div>
        
      </div>
    </section>
  );
}