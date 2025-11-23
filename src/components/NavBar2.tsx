"use client";

import React from "react";
import Link from "next/link";
import NeumorphicButton from "@/components/Neumorphic-Button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations, useLocale } from 'next-intl';

export default function NavBar2() {
  const t = useTranslations('navigation');
  const locale = useLocale();

  const links = [
    { href: `/${locale}/about`, label: t('about') },
  ];

  return (
    <header className={`relative flex flex-grow lg:absolute rounded-full z-50 transition-all backdrop-blur bg-black/20 border-b border-black/10 m-4`}>
      <div className="container">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 py-2">
          {/* Left: Brand */}
          <div className="flex-shrink-0">
            <Link
              href={`/${locale}`}
              className={`rounded-full px-2 py-[6px] text-xl font-script text-pink-100 whitespace-nowrap`}
            >
              Le Chandelier
            </Link>
          </div>

          {/* Center: Navigation - grows/shrinks with content */}
          <div className="hidden md:flex flex-grow items-center justify-around gap-3 py-2 px-4 rounded-full bg-black/80 min-w-0">
            <nav className="flex items-center justify-center flex-wrap gap-x-6 text-sm">
              {links.map((l, idx) => (
                <React.Fragment key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-white/90 hover:text-white transition-colors whitespace-nowrap`}
                  >
                    {l.label}
                  </Link>
                  {idx < links.length - 1 && (
                    <span aria-hidden className="text-white/40">·</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
            <LanguageSwitcher />
          </div>

          {/* Right: Book a table */}
          <div className="flex-shrink-0">
            <NeumorphicButton
              href={`/${locale}/reservation`}
              ariaLabel={t('bookTable')}
            >
              {t('bookTable')}
            </NeumorphicButton>
          </div>
        </div>
      </div>
    </header>
  );
}