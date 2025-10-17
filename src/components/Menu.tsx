"use client";

import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";

type Category = "Appetizers" | "Pasta" | "Pizza" | "Salads" | "Soups" | "Desserts";

type MenuItem = {
  id?: string;
  name: string;
  price: string;
  description: string;
  tags?: Array<"Vegan" | "Vegetarian" | "Spicy" | "Gluten‑Free">;
};

const CATEGORIES: Category[] = ["Appetizers", "Pasta", "Pizza", "Salads", "Soups", "Desserts"];

// Fallback data
const FALLBACK_MENU: Record<Category, MenuItem[]> = {
  Appetizers: [
    { id: "a1", name: "Marinated Olives", price: "$6", description: "Citrus zest, herbs de Provence, garlic confit." },
    { id: "a2", name: "Burrata", price: "$12", description: "Heirloom tomatoes, basil oil, balsamic, toasted sourdough.", tags: ["Vegetarian"] },
    { id: "a3", name: "Beef Carpaccio", price: "$14", description: "Arugula, capers, parmigiano, lemon." },
    { id: "a4", name: "Mushroom Croquettes", price: "$10", description: "Porcini, truffle aioli, chives.", tags: ["Vegetarian"] },
  ],
  Pasta: [
    { id: "p1", name: "Gnocchi with Almonds", price: "$16", description: "Brown butter, sage, toasted almonds, pecorino." },
    { id: "p2", name: "Spinach Ravioli", price: "$18", description: "Ricotta, lemon, poppy seed, beurre blanc.", tags: ["Vegetarian"] },
    { id: "p3", name: "Lasagna", price: "$17", description: "Slow ragù, besciamella, parmigiano." },
    { id: "p4", name: "Carbonara Spaghetti", price: "$19", description: "Guanciale, egg yolk, pecorino, black pepper." },
  ],
  Pizza: [
    { id: "z1", name: "Margherita", price: "$15", description: "Tomato, fior di latte, basil, olive oil.", tags: ["Vegetarian"] },
    { id: "z2", name: "Funghi", price: "$17", description: "Mushroom trio, thyme, taleggio." },
    { id: "z3", name: "Diavola", price: "$18", description: "Spicy salami, chili honey, provolone.", tags: ["Spicy"] },
    { id: "z4", name: "Bianca", price: "$16", description: "Ricotta, garlic, rosemary, mozzarella.", tags: ["Vegetarian"] },
  ],
  Salads: [
    { id: "s1", name: "Caesar", price: "$13", description: "Little gem, anchovy dressing, croutons, parmigiano." },
    { id: "s2", name: "Beet & Citrus", price: "$14", description: "Goat cheese, pistachio, chicories.", tags: ["Vegetarian", "Gluten‑Free"] },
    { id: "s3", name: "Market Greens", price: "$12", description: "Seasonal leaves, herbs, lemon vinaigrette.", tags: ["Vegan", "Gluten‑Free"] },
  ],
  Soups: [
    { id: "u1", name: "Tomato Soup", price: "$10", description: "San Marzano, basil oil, crème fraîche.", tags: ["Vegetarian"] },
    { id: "u2", name: "French Onion", price: "$12", description: "Caramelized onions, gruyère toast." },
  ],
  Desserts: [
    { id: "d1", name: "Tiramisu", price: "$10", description: "Espresso, mascarpone, cocoa." },
    { id: "d2", name: "Panna Cotta", price: "$10", description: "Vanilla bean, macerated berries.", tags: ["Gluten‑Free"] },
    { id: "d3", name: "Chocolate Fondant", price: "$11", description: "Molten center, salted caramel gelato." },
  ],
};

function TagPill({ children }: { children: string }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full border border-black/10 bg-[var(--card)] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wider text-black/70">
      {children}
    </span>
  );
}

type MenuProps = {
  data?: Record<Category, MenuItem[]>;
  categories?: Category[];
};

export default function Menu({ data, categories }: MenuProps) {
  const [active, setActive] = useState<Category>("Pasta");
  const menuData = data || FALLBACK_MENU;
  const menuCategories = categories || CATEGORIES;
  const items = useMemo(() => {
    const categoryItems = menuData[active] ?? [];
    return categoryItems.map((item, idx) => ({
      ...item,
      id: item.id || `${active}-${idx}`,
    }));
  }, [active, menuData]);

  return (
    <section className="section bg-[var(--muted)]/40" id="menu">
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        {/* Left: Title + Category selector */}
        <div className="lg:sticky lg:top-24 self-start">
          <SectionHeading
            title="Menu"
            subtitle="Seasonal ingredients, classic techniques. Select a category to explore."
          />
          <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {menuCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`pill ${active === c ? "bg-black text-white border-black" : ""}`}
                aria-pressed={active === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Items list */}
        <div>
          <div className="rounded-2xl border border-black/10 bg-white/70 p-4 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-extrabold">{active}</h3>
              <span className="text-xs text-black/60">{items.length} items</span>
            </div>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
              {items.map((item) => (
                <li key={item.id} className="group rounded-lg border border-black/5 bg-white/80 p-4 transition hover:bg-white">
                  <div className="flex items-baseline">
                    <h4 className="text-[15px] font-semibold leading-none">{item.name}</h4>
                    <span className="mx-3 hidden flex-1 border-b border-dashed border-black/20 md:block" />
                    <span className="ml-auto text-sm font-medium text-black/80">{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{item.description}</p>
                  <div className="mt-2">
                    {item.tags?.map((t) => (
                      <TagPill key={t}>{t}</TagPill>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional: adjacent visual block to mirror Figma balance */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-black/10 bg-[var(--card)] p-4 text-sm text-black/70">
              Chef’s recommendation: ask for our seasonal specials.
            </div>
            <a
              href="#reservation"
              className="flex items-center justify-center rounded-xl border border-black/10 bg-black px-4 py-3 text-sm font-semibold text-white"
            >
              Reserve a table
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}