import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function DrinksSection() {
  return (
    <section className="section" id="drinks">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <SectionHeading
            title="Wine"
            subtitle="A considered list of natural and old world wines."
          />
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Chianti Classico DOCG</span><span>$12/gl · $48/btl</span></li>
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Sancerre, Loire</span><span>$14/gl · $56/btl</span></li>
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Barbera d’Asti</span><span>$13/gl · $52/btl</span></li>
          </ul>

          <h3 className="mt-10 text-6xl font-script">Cocktails</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Negroni</span><span>$13</span></li>
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Spritz</span><span>$12</span></li>
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Amaretto Sour</span><span>$12</span></li>
          </ul>

          <h3 className="mt-10 text-6xl font-script">Beer</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Pilsner</span><span>$7</span></li>
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Amber Ale</span><span>$7</span></li>
            <li className="flex justify-between rounded-lg bg-[var(--card)] border border-black/10 px-4 py-3"><span>Non‑Alcoholic</span><span>$6</span></li>
          </ul>
        </div>

        <div className="grid gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/restaurante-le-chandelier-2.webp" alt="Bar and cocktails" fill className="object-cover" />
          </div>
          <article className="rounded-xl border border-black/10 bg-white/10 p-6">
            <h4 className="text-xl font-semibold">Midnight Cross</h4>
            <p className="mt-2 text-sm text-white/60">
              2 oz rye whiskey, 1 oz amaro, 1/2 lime juice, 1/4 demerara.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}