"use client";

import Image from "next/image";
import NavBar2 from "../NavBar2";
import { Star } from "lucide-react";

// Award cards data matching the Figma design
const awards = [
  { title: "TRIP ADVISOR", subtitle: "BEST FRENCH RESTAURANT", location: "SAN JOSE" },
  { title: "MICHELIN GUIDE", subtitle: "BEST FRENCH RESTAURANT", location: "SAN JOSE" },
  { title: "STAR DINING", subtitle: "BEST FRENCH RESTAURANT", location: "SAN JOSE" },
];

export default function AboutHero() {
  return (
    <section className="relative h-screen">
      <div className="grid grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_750px]">
        {/* Left: Large "ABOUT" text with vegetables/salt image */}
        <div className="relative h-[96vh] lg:h-auto rounded-3xl overflow-hidden">
          <Image
            src="/Cocina-Le-Chandelier-3.png"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover"
          />
          <NavBar2 />
         <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] text-8xl">
              About
            </h1>
            <p className="pointer-events-none text-white/90 text-lg tracking-tight">
            Discover our story and our journey.
            </p>
            
          </div>
        </div>

        {/* Right: Complex grid layout */}
        <div className="flex flex-col gap-4">
          {/* Top Section: Heading and Images */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Heading and Description */}
              <div className="flex flex-col justify-center">
                <h2 className="text-white font-light text-3xl md:text-4xl lg:text-3xl leading-tight mb-4">
                  FRENCH-SWISS ARTISTRY REDEFINED
                </h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed w-full flex flex-col items-start justify-start">
                  Where culinary craftsmanship meets modern elegance. Indulge in the finest French-Swiss cuisine, expertly curated to elevate your dining experience.
                </p>
              </div>

              {/* Right: Restaurant Images */}
              <div className="gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/Cocina-Le-Chandelier-2.webp"
                    alt="Restaurant interior"
                    fill
                    className="object-cover"
                  />
                </div>
               
              </div>
            </div>
          </div>

          {/* Middle Section: Award Cards */}
          <div className="grid grid-cols-3 gap-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-6 flex flex-col items-center justify-center text-center"
              >
                {/* 5 Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-white text-white"
                    />
                  ))}
                </div>
                
                {/* Award Title */}
                <h3 className="text-white font-light text-sm md:text-base tracking-widest mb-2">
                  {award.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-white/50 text-xs tracking-wide mb-1">
                  {award.subtitle}
                </p>
                <p className="text-white/50 text-xs tracking-wide">
                  {award.location}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Section: Our Story + Chef Image */}
          <div className="grid grid-cols-1 w-full items-center justify-center md:grid-cols-[1fr_200px] gap-4">
            {/* Our Story Text */}
            <div className="relative h-[200px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-white font-light text-xl md:text-3xl mb-6">
                OUR STORY
              </h2>
              <p className="text-white/70 w-full text-sm md:text-base leading-relaxed">
                Founded with a passion for culinary excellence, Le Chandelier&apos;s journey began in the heart of Costa Rica. Over years, it evolved into a haven for food enthusiasts, celebrated for its artful mastery and devotion to redefining gastronomy.
              </p>
            </div>

            {/* Chef Image */}
            <div className="relative h-[300px] md:h-[200px] w-[200px] rounded-3xl overflow-hidden">
              <Image
                src="/Cocina-Le-Chandelier-1.webp"
                alt="Chef at work"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>

          {/* Footer Credits */}
          </div>
      </div>
    </section>
  );
}
