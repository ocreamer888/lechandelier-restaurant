import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function DrinksSection() {
  return (
    <section className="section" id="drinks">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHeading
            title="Wine"
            subtitle="A considered list of natural and old world wines."
          />
          <ul className="mt-6 space-y-2 text-xl">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Chianti Classico DOCG</span><span>$12/gl · $48/btl</span></li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Sancerre, Loire</span><span>$14/gl · $56/btl</span></li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Barbera d’Asti</span><span>$13/gl · $52/btl</span></li>
          </ul>

          <h3 className="mt-10 text-6xl font-script">Cocktails</h3>
          <ul className="mt-4 space-y-2 text-xl">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Negroni</span><span>$13</span></li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Spritz</span><span>$12</span></li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Amaretto Sour</span><span>$12</span></li>
          </ul>

          <h3 className="mt-10 text-6xl font-script">Beer</h3>
          <ul className="mt-4 space-y-2 text-xl">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Pilsner</span><span>$7</span></li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Amber Ale</span><span>$7</span></li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3"><span>Non‑Alcoholic</span><span>$6</span></li>
          </ul>
        </div>

        <div className="grid gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <Image src="/sangria-le-chandelier-4.png" alt="Bar and cocktails" fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
          </div>
          <article className="rounded-3xl bg-gradient-to-br from-pink-200/60 to-pink-200/40 p-6">
            <h4 className="text-5xl font-script">Midnight Cross</h4>
            <p className="mt-2 text-sm text-white/80">
              2 oz rye whiskey, 1 oz amaro, 1/2 lime juice, 1/4 demerara.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}