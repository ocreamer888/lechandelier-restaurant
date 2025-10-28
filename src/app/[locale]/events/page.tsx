"use client";

import EventsHero from "@/components/Events/EventsHero";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { useTranslations, useLocale } from 'next-intl';

export default function Events() {
  const t = useTranslations('breadcrumbs');
  const locale = useLocale();
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('home'), url: `/${locale}` },
    { name: t('events'), url: `/${locale}/events` },
  ]);
  
  return (
    <div>
      <StructuredData data={breadcrumbSchema} />
      <EventsHero />
    </div>
  );
}