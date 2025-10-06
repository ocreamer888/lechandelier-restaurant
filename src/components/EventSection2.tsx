import Image from "next/image";
import SectionHeading from "./SectionHeading";

function Card({
  href,
  label,
  src,
  alt,
}: {
  href: string;
  label: string;
  src: string;
  alt: string;
}) {
  return (
    <a href={href} className="group relative block h-full w-auto overflow-hidden rounded-3xl">
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-0 right-0 flex items-center gap-2">
        <span className="flex flex-row rounded-tl-3xl rounded-br-xl bg-black/50 justify-center items-center px-8 py-4 text-lg font-semibold tracking-tight text-white/90 backdrop-blur">
          {label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
       
      </div>
    </a>
  );
}
export default function EventSection2() {
  return (
    <section className="section" id="events">
      <div className="container">
        <SectionHeading title="Events" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-[4/3]">
            <Card href="#" label="Corporate Events" src="/restaurante-le-chandelier-2.webp" alt="Explore our menu" />
          </div>
          <div className="relative aspect-[4/3]">
            <Card href="#" label="Celebrations" src="/filler-image-2.png" alt="Book a table" />
          </div>
          <div className="relative aspect-[4/3]">
            <Card href="#" label="Private Parties" src="/restaurante-le-chandelier-2.webp" alt="About our restaurant" />
          </div>
          <div className="relative aspect-[4/3]">
            <Card href="#" label="Special Occasions" src="/restaurante-le-chandelier-2.webp" alt="About our restaurant" />
          </div>
        </div>
        
      </div>
      
    </section>
  );
}