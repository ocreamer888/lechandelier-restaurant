import Image from "next/image";

export default function Hero2() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#0f0f0f]" />
      <div className="container min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 items-center py-16">
        <div className="max-w-3xl">
          <h1 className="text-[#d8dfcf] font-extrabold leading-[0.95] tracking-tight text-5xl md:text-7xl">
            Made by Italians.<br />Enjoyed by Everyone.
          </h1>
        </div>
        <div className="relative mt-10 lg:mt-0 h-[55vh] md:h-[65vh]">
          <Image
            src="/restaurante-le-chandelier-3.webp"
            alt="Signature pasta"
            fill
            priority
            className="object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
}