import Image from "next/image";

function Card({
  href,
  src,
  alt,
}: {
  href: string;
  label: string;
  src: string;
  alt: string;
}) {
  return (
    <a href={href} className="group relative block h-[80vh] w-full overflow-hidden rounded-3xl">
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-4 left-8 flex items-center gap-2">
        <h1 className="text-8xl font-script">
          Events
        </h1>
      </div>
    </a>
  );
}

export default function EventSection3() {
  return (
    <section className="section h-full min-h-screen flex justify-center items-center" id="events">
     <div className="flex w-full h-full gap-4 p-2 md:p-4">
        {/* Right: stacked cards */}
        <div className="flex flex-col w-full gap-4">
          <div className="relative h-[80vh] min-h-[180px] lg:h-auto">
            <Card href="/events" label="MENU" src="/Chandelier.png" alt="Explore our menu" />
          </div>
        
         
        </div>
      </div>
        </section>
  );
}