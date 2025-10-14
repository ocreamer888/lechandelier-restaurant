"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Category = "Entradas" | "Platos Fuertes" | "Postres";

type Item = {
  id: string;
  name: string;
  nameEnglish: string;
  price: string;
  description: string;
  image: string;
};

const DATA: Record<Category, Item[]> = {
  Entradas: [
    { 
      id: "e1", 
      name: "Ensalada César con Salmón", 
      nameEnglish: "Caesar salad with Salmon",
      price: "₡7.500", 
      description: "Caesar salad with Salmon.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e2", 
      name: "Ensalada de Pera y Queso de Cabra", 
      nameEnglish: "Pear and Goat Cheese Salad",
      price: "₡6.900", 
      description: "Pear and Goat Cheese Salad.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e3", 
      name: "Carpaccio, Jamón Serrano y Salmón", 
      nameEnglish: "Carpaccio, Serrano Ham and Salmon",
      price: "₡13.500", 
      description: "Carpaccio, Serrano Ham and Salmon.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e4", 
      name: "Bombón de Salmón", 
      nameEnglish: "Salmon and Advovado Bundle",
      price: "₡13.500", 
      description: "Salmon and Advovado Bundle.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e5", 
      name: "Ceviche de Marlín Blanco", 
      nameEnglish: "White Marlin Ceviche",
      price: "₡11.500", 
      description: "White Marlin Ceviche.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e6", 
      name: "Cazuela de Caracoles Bourguignon", 
      nameEnglish: "Bourguignon Snail Casserole",
      price: "₡14.500", 
      description: "Bourguignon Snail Casserole.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e7", 
      name: "Pulpo en Crema de Ajo y Pimentón", 
      nameEnglish: "Octopus in Garlic and Paprika Cream",
      price: "₡13.500", 
      description: "Octopus in Garlic and Paprika Cream.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e8", 
      name: "Sopa de Cebolla Gratinada", 
      nameEnglish: "French Onion Soup",
      price: "₡6.500", 
      description: "French Onion Soup.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e9", 
      name: "Crema de Hongos Crimini", 
      nameEnglish: "Crimini Mushroom Cream Soup",
      price: "₡6.500", 
      description: "Crimini Mushroom Cream Soup.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e10", 
      name: "Crema de Pejibaye", 
      nameEnglish: "Cream of Peach Palm Soup",
      price: "₡6.500", 
      description: "Cream of Peach Palm Soup.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e11", 
      name: "Crema de Mariscos", 
      nameEnglish: "Sea Food Cream",
      price: "₡7.500", 
      description: "Sea Food Cream.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e12", 
      name: "Crema de Tomate", 
      nameEnglish: "Cream of Tomato Soup",
      price: "₡6.500", 
      description: "Cream of Tomato Soup.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
    { 
      id: "e13", 
      name: "Queso Camembert Frito", 
      nameEnglish: "Fried Camembert Cheese",
      price: "₡9.500", 
      description: "Fried Camembert Cheese.", 
      image: "/restaurante-le-chandelier-2.webp"
    },
  ],
  "Platos Fuertes": [
    { 
      id: "p1", 
      name: "Lomito en Salsa de Pimienta Negra", 
      nameEnglish: "Beef Tenderloin in Black Pepper sauce",
      price: "₡16.500", 
      description: "Beef Tenderloin in Black Pepper sauce.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p2", 
      name: "New York Angus Nacional", 
      nameEnglish: "New York Strip Angus",
      price: "₡22.500", 
      description: "New York Strip Angus.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p3", 
      name: "Mar y Tierra Provincial", 
      nameEnglish: "Surf and Turf",
      price: "₡22.500", 
      description: "Surf and Turf.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p4", 
      name: "Rib Eye Angus Nacional", 
      nameEnglish: "Angus Ribeye Steak",
      price: "₡22.000", 
      description: "Angus Ribeye Steak.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p5", 
      name: "Lomito de Res Stroganoff", 
      nameEnglish: "Beef Stroganoff",
      price: "₡16.500", 
      description: "Beef Stroganoff.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p6", 
      name: "Pato Asado en Salsa de Maracuyá o Naranja", 
      nameEnglish: "Roasted Duck with Sauce of your Choice",
      price: "₡18.500", 
      description: "Roasted Duck with Sauce of your Choice.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p7", 
      name: "Corvina Reina en Costra de Almendras", 
      nameEnglish: "Queen Sea Bass in Almond Crust",
      price: "₡15.500", 
      description: "Queen Sea Bass in Almond Crust.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p8", 
      name: "Lengua en Salsa (Alcaparras o Pomodoro)", 
      nameEnglish: "Beef Tongue Capers or Tomato sauce",
      price: "₡15.500", 
      description: "Beef Tongue Capers or Tomato sauce.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p9", 
      name: "Salmón Grille en Salsa de Dátiles", 
      nameEnglish: "Grilled Salmon in Date Sauce",
      price: "₡15.500", 
      description: "Grilled Salmon in Date Sauce.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p10", 
      name: "Cola de Langosta 250g", 
      nameEnglish: "Lobster Tail 250g",
      price: "₡28.500", 
      description: "Lobster Tail 250g.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p11", 
      name: "Camarones Jumbo en Crema de Eneldo", 
      nameEnglish: "Grilled Jumbo Shrimp in Dill Sauce",
      price: "₡23.500", 
      description: "Grilled Jumbo Shrimp in Dill Sauce.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
    { 
      id: "p12", 
      name: "Fondue de Queso (2 personas)", 
      nameEnglish: "Cheese Fondue for 2 people",
      price: "₡38.000", 
      description: "Cheese Fondue for 2 people.", 
      image: "/restaurante-le-chandelier-3.webp"
    },
  ],
  Postres: [
    { 
      id: "d1", 
      name: "Crème Brûlée con frutos Rojos", 
      nameEnglish: "Burnt Cream with Red Fruits",
      price: "₡6.500", 
      description: "Burnt Cream with Red Fruits.", 
      image: "/filler-image-1.png"
    },
    { 
      id: "d2", 
      name: "Mousse de Chocolate Suiza", 
      nameEnglish: "Chocolate Mousse",
      price: "₡6.500", 
      description: "Chocolate Mousse.", 
      image: "/filler-image-1.png"
    },
    { 
      id: "d3", 
      name: "Flan de Coco Costarricense", 
      nameEnglish: "Coconut Flan, Typical Costa Rican Dessert!",
      price: "₡6.500", 
      description: "Coconut Flan, Typical Costa Rican Dessert!", 
      image: "/filler-image-1.png"
    },
    { 
      id: "d4", 
      name: "Práline de Almendras y Nueces", 
      nameEnglish: "Almond, Praline Iced Cream",
      price: "₡6.500", 
      description: "Almond, Praline Iced Cream.", 
      image: "/filler-image-1.png"
    },
    { 
      id: "d5", 
      name: "Rocas de Amaretto", 
      nameEnglish: "Amaretto Iced Cream Roc",
      price: "₡6.500", 
      description: "Amaretto Iced Cream Roc.", 
      image: "/filler-image-1.png"
    },
  ],
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

export default function Menu4() {
  const [active, setActive] = useState<Category>("Entradas");
  const items = useMemo(() => DATA[active] ?? [], [active]);

  return (
    <section className="bg-gradient-to-b from-transparent via-black/20 to-transparent py-16 md:py-24 text-white" id="menu">
      <div className="mx-auto w-full max-w-5xl px-4 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {(["Entradas", "Platos Fuertes", "Postres"] as Category[]).map((c) => (
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
            <li key={it.id} className="grid grid-cols-[88px_1fr_auto] items-start gap-5">
              <div className="relative h-16 w-24 overflow-hidden rounded-md bg-white/5 ring-1 ring-white/10">
                <Image src={it.image} alt={it.name} fill className="object-cover" />
              </div>

              <div className="col-span-1">
                <div className="flex items-baseline">
                  <h3 className="text-[15px] font-semibold uppercase tracking-wider text-white/90">
                    {it.name}
                  </h3>
                  <span className="mx-3 hidden flex-1 border-b border-dotted border-pink-200/40 md:block" />
                </div>
                <p className="mt-1 text-xs italic text-white/50">{it.nameEnglish}</p>
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
