"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { useTranslations } from 'next-intl';

export default function WhoWeAre() {
  const t = useTranslations('whoWeAre');
  
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-card">
            <Image src="/Javi-Le-Chandelier-Chef-1.png" alt={t('images.dining')} fill className="object-cover" />
          </figure>
          <figure className="hidden md:block relative aspect-[4/3] overflow-hidden rounded-3xl bg-card">
            <Image src="/Kenneth-Le-Chandelier-2.webp" alt={t('images.oven')} fill className="object-cover" />
          </figure>
          <figure className="hidden md:block relative aspect-[4/3] overflow-hidden rounded-3xl bg-card">
            <Image src="/Lenner-Le-Chandelier-Chef-1.png" alt={t('images.guests')} fill className="object-cover" />
          </figure>
        </div>
      </div>
    </section>
  );
}