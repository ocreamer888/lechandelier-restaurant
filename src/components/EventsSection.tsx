import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function EventsSection() {
  return (
    <section className="section" id="events">
      <div className="container">
        <SectionHeading title="Events" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/restaurante-le-chandelier-2.webp" alt="Corporate events" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-4 left-4 text-white font-semibold drop-shadow">Corporate Events</div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/restaurante-le-chandelier-2.webp" alt="Celebrations" fill className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/restaurante-le-chandelier-2.webp" alt="Private parties" fill className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/restaurante-le-chandelier-2.webp" alt="Special occasions" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}