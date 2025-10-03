"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#menu", label: "Menu" },
];

export default function NavBar2() {
  const [scrolled] = useState(false);
  return (
    <header className={`relative lg:absolute rounded-full z-50 transition-all backdrop-blur bg-black/20 border-b border-black/10 m-4`}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center py-2">
          <div className="hidden md:flex items-center justify-center gap-3 py-2 rounded-full bg-black/40">
            <nav className="items-center gap-4 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`text-white/90 hover:text-white`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center: Brand */}
          <div className="justify-self-center">
            <Link
              href="/"
              className={`rounded-full px-3 py-[6px] text-xl font-script text-pink-200`}
            >
              Le Chandelier
            </Link>
          </div>

          {/* Right: Book a table */}
          <div className="flex items-center justify-end">
            <a
              href="#reservation"
              className={`rounded-full px-4 py-2 text-sm border border-white/10 text-white bg-pink-200/40 backdrop-blur`}
            >
              Book a table
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}