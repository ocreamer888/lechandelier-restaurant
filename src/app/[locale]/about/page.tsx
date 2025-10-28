"use client";

import AboutHero from "@/components/About/AboutHero";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { useTranslations, useLocale } from 'next-intl';

export default function About() {
  const t = useTranslations('breadcrumbs');
  const locale = useLocale();
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('home'), url: `/${locale}` },
    { name: t('about'), url: `/${locale}/about` },
  ]);
  
  return (
    <div className="min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <AboutHero />
    </div>
  );
}