import Image from "next/image";
import NavBar2 from "./NavBar2";

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
    <a href={href} className="group relative block h-full w-full overflow-hidden rounded-3xl">
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-0 right-0 flex items-center gap-2">
        <span className="flex flex-row rounded-tl-3xl rounded-br-xl bg-black/50 justify-center items-center px-8 py-4 text-md text-white/90 backdrop-blur">
          {label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
       
      </div>
    </a>
  );
}

export default function Hero3() {
  return (
    <section className="relative h-auto">
      <div className="grid h-auto lg:h-screen grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_420px]">
        {/* Left: main hero image */}
        <div className="relative h-[96vh] lg:h-full rounded-3xl overflow-hidden">
          <Image
            src="/filler-image-1.png"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover"
          />
          <NavBar2 />
         <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] text-8xl">
              Le Chandelier
            </h1>
            <p className="pointer-events-none text-white/90 text-lg tracking-tight">
            French-Swiss cuisine in the heart of Costa Rica.
            </p>
            
          </div>
        </div>

        {/* Right: stacked cards */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="relative h-[28vh] min-h-[180px] lg:h-auto">
            <Card href="/menu" label="MENU" src="/menu-le-chandelier-1.png" alt="Explore our menu" />
          </div>
          <div className="relative h-[24vh] min-h-[160px] lg:h-auto">
            <Card href="/reservation" label="RESERVATION" src="/filler-image-2.png" alt="Book a table" />
          </div>
         
        </div>
      </div>
    </section>
  );
}