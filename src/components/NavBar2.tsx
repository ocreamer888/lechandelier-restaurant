"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#menu", label: "Menu" },
];

export default function NavBar2() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header className={`relative lg:absolute rounded-full z-50 transition-all backdrop-blur bg-black/20 border-b border-black/10 m-4`}>
      <div className="container">
        <div className="grid grid-cols-3 items-center py-2">
          <div className="flex items-center gap-3">
            <nav className="items-center gap-4 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`text-white/80 hover:text-white`}
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
              className={`rounded-full px-3 py-[6px] text-lg font-script border
                ${scrolled
                  ? "border-black/10 bg-white/70 text-black"
                  : "border-white/15 bg-black/40 text-white/90 backdrop-blur"}`}
            >
              Le Chandelier
            </Link>
          </div>

          {/* Right: Book a table */}
          <div className="flex items-center justify-end">
            <a
              href="#reservation"
              className={`rounded-full px-4 py-2 text-sm border
                ${scrolled ? "border-black/10 bg-black text-white" : "border-white/15 bg-black/80 text-white"}`}
            >
              Book a table
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}