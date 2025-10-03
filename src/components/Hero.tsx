import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen">
      <Image
        src="/restaurante-le-chandelier-3.webp"
        alt="Le Chandelier dining room"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="container relative h-full flex flex-col items-start justify-center">
        <h1 className="text-white text-4xl md:text-8xl font-extrabold font-script drop-shadow">Le Chandelier</h1>
        <p className="mt-3 text-white/90 text-base md:text-lg drop-shadow">French-Swiss cuisine in the heart of Costa Rica.</p>
        <div className="mt-6 flex gap-3">
          <a href="#menu" className="pill bg-white">Explore menu</a>
          <a href="#contact" className="pill bg-black text-white border-black">Reserve</a>
        </div>
      </div>
    </section>
  );
}