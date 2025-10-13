import Image from "next/image";
import SectionHeading from "./SectionHeading";

const TEAM = [
  { name: "Clauido Dubuis", role: "Owner", image: "/Andrea-Retrato-Le-Chandelier.webp" },
  { name: "Andrea Dubuis", role: "Owner", image: "/Andrea-Retrato-Le-Chandelier.webp" },
  { name: "Federico Sanchez", role: "Manager", image: "/Fede-Retrato-Le-Chandelier-3.webp" },
  { name: "Kevin Araya", role: "Captain", image: "/Kevin-Retrato-Le-Chandelier-3.webp" },
  { name: "Luis Offer", role: "Waiter", image: "/Luis-Retrato-Le-Chandelier-3.webp" },
  { name: "Edgar", role: "Waiter", image: "/Edgar-Retrato-Le-Chandelier.webp" },
  { name: "Kenneth", role: "Main Chef", image: "/Kenneth-Retrato-Le-Chandelier-2.webp" },
  { name: "Javier Baca", role: "Chef", image: "/Javi-Retrato-Le-Chandelier.webp" },
  { name: "Lenner", role: "Sub-Chef", image: "/Lenner-Retrato-Le-Chandelier-3.webp" },
];

export default function TeamSection() {
  return (
    <section className="section" id="team">
      <div className="container">
        <SectionHeading title="Our team" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((m) => (
            <article key={m.name} className="rounded-xl overflow-hidden border border-black/10 bg-white/10">
              <div className="relative aspect-[4/3]">
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-white/60">{m.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}