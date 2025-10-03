"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const leftLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#team", label: "Team" },
];

const rightLinks = [
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header className={`absolute w-full top-4 z-50 transition-all ${scrolled ? "backdrop-blur bg-white/70 border-b border-black/10" : "bg-transparent"}`}>
      <div className="container">
        <div className="grid grid-cols-3 items-center h-12 sm:h-14">
          {/* Left: Hamburger + quick links (md+) */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white/70 hover:bg-white transition"
            >
              <span className="sr-only">Toggle navigation</span>
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
                <path d="M1 1h16M1 6h12M1 11h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <nav className="hidden md:flex items-center gap-4 text-sm">
              {leftLinks.map((l) => (
                <a key={l.href} href={l.href} className="hover:underline underline-offset-4">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

                    {/* Center: Brand */}
                    <div className="justify-self-center">
            <Link href="/" className="font-script text-xl sm:text-2xl tracking-normal">
              Le Chandelier
            </Link>
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center justify-end gap-4 text-sm">
            <nav className="hidden sm:flex items-center gap-4">
              {rightLinks.map((l) => (
                <a key={l.href} href={l.href} className="hover:underline underline-offset-4">
                  {l.label}
                </a>
              ))}
            </nav>
            <button className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs sm:text-sm">
              EN
            </button>
          </div>
        </div>

        {/* Dropdown (mobile) */}
        {open && (
          <div className="md:hidden border-t border-black/10 pb-3">
            <nav className="flex flex-col gap-2 pt-3 text-sm">
              {[...leftLinks, ...rightLinks].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 hover:bg-white"
                >
                  {l.label}
                </a>
              ))}
              <button className="self-start rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs mt-1">
                EN
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}