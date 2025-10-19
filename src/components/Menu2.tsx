"use client";
import { useMemo, useState } from "react";

type Category = "Entradas" | "Platos Fuertes" ;

type Item = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  tags?: Array<"spicy" | "vegan">;
};

const DATA: Record<Category, Item[]> = {
  Entradas: [
    { id: "e1", name: "Ensalada César", price: "$12", description: "Lechuga romana, crutones artesanales, queso parmesano, aderezo César clásico.", image: "/restaurante-le-chandelier-2.webp" },
    { id: "e2", name: "Carpaccio de Res", price: "$16", description: "Finas láminas de res, rúcula fresca, alcaparras, queso parmesano, aceite de trufa.", image: "/restaurante-le-chandelier-2.webp" },
    { id: "e3", name: "Ceviche Peruano", price: "$14", description: "Pescado fresco marinado en limón, cilantro, cebolla morada, camote y maíz tostado.", image: "/restaurante-le-chandelier-2.webp", tags: ["spicy"] },
    { id: "e4", name: "Tabla de Quesos", price: "$18", description: "Selección de quesos artesanales, mermelada de higos, nueces caramelizadas.", image: "/restaurante-le-chandelier-2.webp" },
    { id: "e5", name: "Bruschetta Italiana", price: "$10", description: "Pan artesanal tostado, tomate fresco, albahaca, ajo, aceite de oliva extra virgen.", image: "/restaurante-le-chandelier-2.webp", tags: ["vegan"] },
  ],
  "Platos Fuertes": [
    { id: "p1", name: "Filet Mignon", price: "$38", description: "Filete de res premium 8oz, puré de papas trufado, espárragos asados, reducción de vino tinto.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "p3", name: "Pato Confitado", price: "$36", description: "Pierna de pato confitada, puré de manzana, col morada, salsa de naranja y Grand Marnier.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "p4", name: "Cordero Asado", price: "$42", description: "Rack de cordero con hierbas, couscous marroquí, vegetales rostizados, salsa de menta.", image: "/restaurante-le-chandelier-3.webp" },
    { id: "p5", name: "Risotto de Hongos", price: "$26", description: "Arroz arborio, selección de hongos silvestres, trufa negra, queso parmesano.", image: "/restaurante-le-chandelier-3.webp", tags: ["vegan"] },
    { id: "p6", name: "Pasta con Langosta", price: "$45", description: "Linguini fresco, langosta entera, tomate cherry, vino blanco, mantequilla de limón.", image: "/restaurante-le-chandelier-3.webp" },
  ]
};

function SectionOrnament({ text }: { text: string }) {
  return (
    <div className="my-8 flex items-center justify-center font-script gap-4">
      <span className="h-px w-16 bg-white/15" />
      <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
      <h2 className="text-center text-white text-6xl">{text}</h2>
      <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
      <span className="h-px w-16 bg-white/15" />
    </div>
  );
}

function TagDot({ kind }: { kind: "spicy" | "vegan" }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full border border-yellow-100/40 px-2 py-[1px] text-[10px] uppercase tracking-wider text-yellow-100/70">
      {kind === "spicy" ? "Spicy" : "Vegan"}
    </span>
  );
}

export default function Menu2() {
  const [active, setActive] = useState<Category>("Entradas");
  const items = useMemo(() => DATA[active] ?? [], [active]);

  return (
    <section className="bg-gradient-to-b from-transparent via-black/20 to-transparent text-white" id="menu">
      <div className="mx-auto w-full max-w-5xl px-4 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {(["Entradas", "Platos Fuertes"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === c
                  ? "border-white/20 bg-pink-200/40 text-white"
                  : "border-white/10 bg-pink-200/10 text-white/80 hover:bg-pink-200/20"
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
            <li key={it.id} className="grid grid-cols-[250px_1fr_auto] md:grid-cols-[500px_1fr_auto] items-start gap-5">
             

              <div className="col-span-1">
                <div className="flex items-baseline">
                  <h3 className="text-[15px] font-semibold uppercase tracking-wider text-white/90">
                    {it.name}
                  </h3>
                  {it.tags?.map((t) => (
                    <TagDot key={t} kind={t} />
                  ))}
                  <span className="mx-3 hidden flex-1 border-b border-dotted border-pink-200/40 md:block" />
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