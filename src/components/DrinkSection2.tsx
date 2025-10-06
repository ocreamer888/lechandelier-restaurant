"use client";

import Image from "next/image";
import Link from "next/link";



export default function DrinkSection2() {
  return (
    <section className="relative min-h-screen">
      <div className="grid h-auto min-h-screen grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_600px]">
      
        <Link href="/menu" className="relative h-[50vh] lg:h-full rounded-3xl overflow-hidden group block" id="menu">
          <Image
            src="/filler-image-1.png"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
         <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] text-8xl">
              Fine Wines
            </h1>
            <p className="pointer-events-none text-white/90 text-lg tracking-tight">
            A considered list of natural and old world wines.
            </p>
            
          </div>
        </Link>

        {/* Right: content sections */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        <Link href="/menu" className="relative h-[50vh] lg:h-full rounded-3xl overflow-hidden group block" id="menu">
          <Image
            src="/filler-image-1.png"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
         <div className="absolute inset-0 bg-black/20" />
          
        </Link>
        <Link href="/menu" className="relative h-[50vh] lg:h-full rounded-3xl overflow-hidden group block" id="menu">
          <Image
            src="/filler-image-1.png"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        
        </Link>
        </div>
      </div>
    </section>
  );
}
