import React from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * StructuredData component
 * Renders JSON-LD structured data for SEO
 * @param data - The structured data object to be rendered as JSON-LD
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

