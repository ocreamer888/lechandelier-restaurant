"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";

type Dish = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: "Appetizers" | "Pasta" | "Pizza" | "Salads" | "Soups" | "Desserts";
};

const DISHES: Dish[] = [
  { id: "1", name: "Gnocchi with almonds", price: "$10", image: "/restaurante-le-chandelier-2.webp", category: "Pasta" },
  { id: "2", name: "Mini spinach ravioli", price: "$12", image: "/restaurante-le-chandelier-2.webp", category: "Pasta" },
  { id: "3", name: "Lasagna", price: "$8", image: "/restaurante-le-chandelier-2.webp", category: "Pasta" },
  { id: "4", name: "Carbonara spaghetti", price: "$15", image: "/restaurante-le-chandelier-2.webp", category: "Pasta" },
  { id: "5", name: "Margherita", price: "$14", image: "/restaurante-le-chandelier-2.webp", category: "Pizza" },
  { id: "6", name: "Caesar salad", price: "$11", image: "/restaurante-le-chandelier-2.webp", category: "Salads" },
  { id: "7", name: "Tomato soup", price: "$9", image: "/restaurante-le-chandelier-2.webp", category: "Soups" },
  { id: "8", name: "Tiramisu", price: "$9", image: "/restaurante-le-chandelier-2.webp", category: "Desserts" },
];

const CATEGORIES: Dish["category"][] = ["Appetizers", "Pasta", "Pizza", "Salads", "Soups", "Desserts"];

export default function MenuSection() {
  const [active, setActive] = useState<Dish["category"]>("Pasta");
  const filtered = useMemo(() => DISHES.filter((d) => d.category === active), [active]);

  return (
    <section className="section bg-[var(--muted)]/40" >
      <div className="container">
        <SectionHeading
          title="Menu"
          subtitle="Seasonal ingredients, classic techniques. Select a category to explore."
          align="center"
        />
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`pill ${active === c ? "bg-black text-white border-black" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((dish) => (
            <article key={dish.id} className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/10">
              <div className="relative aspect-square">
                <Image src={dish.image} alt={dish.name} fill className="object-cover" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-medium">{dish.name}</h3>
                <span className="text-sm text-black/60">{dish.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}