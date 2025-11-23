"use client";

import StructuredData from "./StructuredData";
import { generateFAQSchema } from "@/lib/faq-data";
import { useLocale } from 'next-intl';

/**
 * FAQ Schema Component
 * Renders FAQ structured data for SEO
 * Optimized for voice search and AI assistants
 */
export default function FAQSchema() {
    const locale = useLocale() as 'en' | 'es';
    const faqSchema = generateFAQSchema(locale);

    return <StructuredData data={faqSchema} />;
}
