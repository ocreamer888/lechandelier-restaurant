"use client";

import Image from "next/image";
import Link from "next/link";
import Menu2 from "./Menu2";
import { useTranslations, useLocale } from 'next-intl';

export default function MenuSection2() {
  const t = useTranslations('menu');
  const locale = useLocale();
  
  return (
    <section className="relative min-h-screen">
      <div className="grid items-start justify-start h-auto grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_600px]">
      
        <Link href={`/${locale}/menu`} className="relative h-[28vh] lg:h-[90vh] max-h-[700px] mb-8 lg:mb-0 rounded-3xl overflow-hidden group block border border-white/10" id="menu">
          <Image
            src="/pato-a-la-naranja-le-chandelier-1.png"
            alt={t('imageAlt')}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] md:text-8xl text-7xl">
              {t('title')}
            </h1>
            <p className="pointer-events-none text-center lg:text-left text-white/90 text-lg tracking-tight">
              {t('subtitle')}
            </p>
          </div>
        </Link>

        <Menu2 />
      </div>
    </section>
  );
}