"use client";

import StructuredData from "@/components/StructuredData";
import {
  generateRestaurantSchema,
  generateMenuSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import { useTranslations, useLocale } from 'next-intl';

export default function MenuStructuredData() {
  const t = useTranslations('breadcrumbs');
  const locale = useLocale();
  
  const restaurantSchema = generateRestaurantSchema({
    ratingValue: 4.8,
    reviewCount: 150,
  });

  const menuSchema = generateMenuSchema({
    menuSections: [
      { name: "Appetizers", description: "Exquisite French-Swiss starters" },
      { name: "Main Courses", description: "Masterfully crafted entrées" },
      { name: "Desserts", description: "Decadent sweet finales" },
      { name: "Beverages", description: "Curated wines and cocktails" },
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('home'), url: `/${locale}` },
    { name: t('menu'), url: `/${locale}/menu` },
  ]);

  return (
    <>
      <StructuredData data={restaurantSchema} />
      <StructuredData data={menuSchema} />
      <StructuredData data={breadcrumbSchema} />
    </>
  );
}
