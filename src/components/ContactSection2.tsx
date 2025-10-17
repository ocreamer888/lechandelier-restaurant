"use client";

import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import type { SiteSettings } from "@/lib/sanity";

// Fallback opening hours data
const FALLBACK_OPENING_HOURS = [
  { day: "Monday", time: "18:00 - 22:30" },
  { day: "Tuesday", time: "18:00 - 22:30" },
  { day: "Wednesday", time: "18:00 - 22:30" },
  { day: "Thursday", time: "18:00 - 22:30" },
  { day: "Friday", time: "18:00 - 22:30" },
  { day: "Saturday", time: "18:00 - 22:30" },
  { day: "Sunday", time: "Closed" }
];

const FALLBACK_CONTACT = {
  address: "Los Yoses, San Jose, Costa Rica",
  phone: "+506 7130 0911",
  email: "hello@lechandelier.restaurant",
  mapsLink: "https://www.google.com/maps/place/Le+Chandelier/@9.9293391,-84.0589315,17z",
};

const FALLBACK_SOCIAL = {
  facebook: "https://facebook.com/lechandeliercr",
  instagram: "https://instagram.com/lechandeliercr",
  twitter: "https://twitter.com/lechandeliercr",
};

type ContactSection2Props = {
  settings?: SiteSettings | null;
};

export default function ContactSection2({ settings }: ContactSection2Props) {
  const openingHours = settings?.openingHours || FALLBACK_OPENING_HOURS;
  const contact = settings?.contact || FALLBACK_CONTACT;
  const socialLinks = settings?.socialLinks || FALLBACK_SOCIAL;
  return (
    <section className="relative min-h-screen">
      <div className="grid h-auto min-h-screen grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_600px]">
        {/* Left: main contact image with overlay */}
        <div className="relative h-[96vh] lg:h-full rounded-3xl overflow-hidden">
          <Image
            src="/restaurante-le-chandelier-3.webp"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover"
          />
         <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] text-8xl">
              Contact
            </h1>
            <p className="pointer-events-none text-white/90 text-lg tracking-tight">
            Book a table or get in touch with us.
            </p>
            
          </div>
        </div>

        {/* Right: content sections */}
        <div className="flex flex-col gap-4">
          {/* Opening Hours Section */}
         <div className="flex flex-col md:flex-row justify-between items-center w-full h-full gap-4">
             <div className="relative rounded-3xl border border-pink-100/20 backdrop-blur-sm p-8 md:p-10 overflow-hidden flex-1 flex flex-col items-between justify-between h-full w-full">

            <h2 className="text-2xl items-center justify-center w-full flex flex-row font-light text-white mb-8">
              OPENING HOURS
            </h2>
            
            <div className="space-y-4">
              {openingHours.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-white/90"
                >
                  <span className="text-sm md:text-base tracking-wide">
                    {item.day}
                  </span>
                  <span className="mx-3 flex-1 border-b border-dotted border-pink-200/40" />

                  <span className="text-sm md:text-base font-light">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="relative flex-1 rounded-3xl overflow-hidden w-full h-full min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-pink-200/30 to-pink-200/20 ">
              {/* Placeholder for map - replace with actual map implementation */}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center text-white/50">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm text-white">Map view</p>
                  </div>
            <div className="absolute bottom-8">
                  <a
                href={contact.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-white/20 transition-all text-white text-sm"
              >
                <span>SHOW ROUTE</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              </div>
            
              </div>
            </div>
            </div>
            {/* Show Route Button */}
            
          </div>

          {/* Get in Touch Section */}
          <div className="relative rounded-3xl items-center justify-center w-full flex flex-col border border-pink-100/20 backdrop-blur-sm p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-8">
              GET IN TOUCH
            </h2>
            
            <div className="space-y-6 items-center justify-center w-full flex flex-col text-white/90">
              <div className="items-center justify-between w-full flex flex-row">
                <p className="text-xs text-white/60 tracking-wider mb-1">ADDRESS</p>
                <p className="text-base md:text-lg">{contact.address}</p>
              </div>
              
              <div className="items-center justify-between w-full flex flex-row">
                <p className="text-xs text-white/60 tracking-wider mb-1">PHONE</p>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="text-base md:text-lg hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
              
              <div className="items-center justify-between w-full flex flex-row">
                <p className="text-xs text-white/60 tracking-wider mb-1">EMAIL</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-base md:text-lg hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              
              <div className="items-center justify-between w-full flex flex-row">
                <p className="text-xs text-white/60 tracking-wider mb-2">FOLLOW</p>
                <div className="flex gap-4">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={socialLinks.twitter}
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

         </div>
      </div>
    </section>
  );
}
