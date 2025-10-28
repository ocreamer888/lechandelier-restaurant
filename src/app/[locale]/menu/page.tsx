"use client";

import MenuHero2 from "@/components/Menu/MenuHero2";
import Menu3Wrapper from "@/components/Menu3Wrapper";
import DrinksSectionWrapper from "@/components/DrinksSectionWrapper";
import ContactSection2Wrapper from "@/components/ContactSection2Wrapper";
import StructuredData from "@/components/StructuredData";
import {
  generateRestaurantSchema,
  generateMenuSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import { useTranslations, useLocale } from 'next-intl';

export default function Menu() {
  const t = useTranslations('breadcrumbs');
  const locale = useLocale();
  
  // Generate structured data for the menu page
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
    <div>
      <StructuredData data={restaurantSchema} />
      <StructuredData data={menuSchema} />
      <StructuredData data={breadcrumbSchema} />
      <MenuHero2 />
      <Menu3Wrapper/>
      <DrinksSectionWrapper/>
      <ContactSection2Wrapper />
    </div>
  );
}