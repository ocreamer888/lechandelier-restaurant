import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function WhoWeAre() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          title="Who are we?"
          subtitle="Rooted in seasonal produce and wood‑fire traditions. A warm place to gather, celebrate, and savor."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card">
            <Image src="/Javi-Le-Chandelier-Chef-1.png" alt="Dining room" fill className="object-cover" />
          </figure>
          <figure className="hidden md:block relative aspect-[4/3] overflow-hidden rounded-lg bg-card">
            <Image src="/Lenner-Le-Chandelier-Chef-2.png" alt="Wood fired oven" fill className="object-cover" />
          </figure>
          <figure className="hidden md:block relative aspect-[4/3] overflow-hidden rounded-lg bg-card">
            <Image src="/Javi-Le-Chandelier-Chef-1.png" alt="Guests enjoying dinner" fill className="object-cover" />
          </figure>
        </div>
      </div>
    </section>
  );
}