import Link from "next/link";
import Image from "next/image";
import DrinksMenu from "./DrinksMenu";

export default function DrinksSection3() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="grid items-center justify-center lg:w-4/5 w-full h-auto grid-cols-1 gap-4 p-2 py-16 md:p-4">
    <Link href="/menu" className="relative h-[40vh] max-h-[700px] mb-8 lg:mb-0 rounded-3xl overflow-hidden group block border border-white/10" id="menu">
<Image
  src="/sangria-le-chandelier-3.png"
  alt="Signature dish plated"
  fill
  priority
  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
/>
<div className="absolute inset-0 bg-black/20" />
<div className="relative flex flex-col w-full h-full items-center justify-center  p-6 md:p-10">
  <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] md:text-8xl text-7xl">
    Drinks
  </h1>
  <p className="pointer-events-none text-center lg:text-left text-white/90 text-lg tracking-tight">
  An exquisite selection of champagnes and fine wines from around the world.
  </p>
  
</div>
</Link>
<DrinksMenu/>
</div>
</section>
  );
}