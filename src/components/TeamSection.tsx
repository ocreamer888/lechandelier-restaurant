import Image from "next/image";
import SectionHeading from "./SectionHeading";

const TEAM = [
  { name: "Claudio Dubuis", role: "Founder", image: "/Javi-Le-Chandelier-Chef-1.png" },
  { name: "Kenneth", role: "Chef", image: "/Javi-Le-Chandelier-Chef-1.png" },
  { name: "Kevin Araya", role: "Chef", image: "/Javi-Le-Chandelier-Chef-1.png" },
];

export default function TeamSection() {
  return (
    <section className="section" id="team">
      <div className="container">
        <SectionHeading title="Our team" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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