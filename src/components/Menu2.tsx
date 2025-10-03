"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Category = "Maki" | "Uramaki" | "Special Rolls";

type Item = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  tags?: Array<"spicy" | "vegan">;
};

const DATA: Record<Category, Item[]> = {
  Maki: [
    { id: "m1", name: "Spicy Tuna Maki", price: "$5", description: "Spicy tuna, cucumber, avocado, rolled in nori and seasoned rice.", image: "/restaurante-le-chandelier-2.webp", tags: ["spicy"] },
    { id: "m2", name: "Mango Maki", price: "$5", description: "Tempura shrimp, cucumber, cream cheese, core of fresh avocado.", image: "/restaurante-le-chandelier-2.webp" },
    { id: "m3", name: "Salmon Maki", price: "$5", description: "Shiitake, avocado, pickled daikon, sesame seeds.", image: "/restaurante-le-chandelier-2.webp" },
    { id: "m4", name: "Tuna Maki", price: "$5", description: "Julienned carrots, bell peppers, cucumber in a nori-wrapped roll.", image: "/restaurante-le-chandelier-2.webp" },
  ],
  Uramaki: [
    { id: "u1", name: "Volcano Delight", price: "$12", description: "Crab salad, avocado, cucumber, topped with spicy tuna and sriracha.", image: "/restaurante-le-chandelier-3.webp", tags: ["spicy"] },
    { id: "u2", name: "Rainbow Fusion", price: "$12", description: "Fresh tuna, salmon, yellowtail, avocado, with cucumber and crab.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "u3", name: "Dragon Elegance", price: "$12", description: "Grilled eel and avocado, draped with ripe avocado slices.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "u4", name: "Sunset Serenity", price: "$12", description: "Tempura shrimp, cucumber, spicy mayo, soy paper.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "u5", name: "Mystic Garden", price: "$12", description: "Shiitake, asparagus, cucumber, sesame seeds.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "u6", name: "Ocean Breeze", price: "$12", description: "Shrimp, crab stick, avocado, yuzu-infused tobiko.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "u7", name: "Tokyo Blossom", price: "$12", description: "Tuna, crab stick, cucumber in pink soy paper, flower petals.", image: "/restaurante-le-chandelier-3.webp" },
  ],
  "Special Rolls": [
    { id: "s1", name: "Sunrise Bliss", price: "$16", description: "Salmon, cream cheese, asparagus, orange-hued tobiko.", image: "/filler-image-1.png", tags: ["spicy"] },
    { id: "s2", name: "Mango Tango Fusion", price: "$16", description: "Tempura shrimp, cucumber, avocado, sweet mango, mango sauce.", image: "/filler-image-1.png" },
    { id: "s3", name: "Truffle Indulgence", price: "$16", description: "Black truffle, wagyu beef, cucumber, microgreens.", image: "/filler-image-1.png" },
    { id: "s4", name: "Pacific Firecracker", price: "$16", description: "Crab salad, tempura shrimp, jalapeño, chili-infused aioli.", image: "/filler-image-1.png", tags: ["spicy"] },
    { id: "s5", name: "Eternal Eel Enchantment", price: "$16", description: "Eel tempura, foie gras, cucumber, truffle oil, gold leaf.", image: "/filler-image-1.png" },
  ],
};

function SectionOrnament({ text }: { text: string }) {
  return (
    <div className="my-8 flex items-center justify-center font-script gap-4">
      <span className="h-px w-16 bg-white/15" />
      <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
      <h2 className="text-center text-6xl font-semibold tracking-tight">{text}</h2>
      <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
      <span className="h-px w-16 bg-white/15" />
    </div>
  );
}

function TagDot({ kind }: { kind: "spicy" | "vegan" }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full border border-white/20 px-2 py-[1px] text-[10px] uppercase tracking-wider text-white/70">
      {kind}
    </span>
  );
}

export default function Menu2() {
  const [active, setActive] = useState<Category>("Maki");
  const items = useMemo(() => DATA[active] ?? [], [active]);

  return (
    <section className="bg-gradient-to-b from-transparent via-black/20 to-transparent py-16 md:py-24 text-white" id="menu">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {(["Maki", "Uramaki", "Special Rolls"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === c
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
              }`}
              aria-pressed={active === c}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        <SectionOrnament text={active} />

        <ul className="space-y-8">
          {items.map((it) => (
            <li key={it.id} className="grid grid-cols-[88px_1fr_auto] items-start gap-5">
              <div className="relative h-16 w-24 overflow-hidden rounded-md bg-white/5 ring-1 ring-white/10">
                <Image src={it.image} alt={it.name} fill className="object-cover" />
              </div>

              <div className="col-span-1">
                <div className="flex items-baseline">
                  <h3 className="text-[15px] font-semibold uppercase tracking-wider text-white/90">
                    {it.name}
                  </h3>
                  {it.tags?.map((t) => (
                    <TagDot key={t} kind={t} />
                  ))}
                  <span className="mx-3 hidden flex-1 border-b border-dotted border-white/20 md:block" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{it.description}</p>
              </div>

              <div className="ml-auto text-sm font-medium text-white/90">{it.price}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}