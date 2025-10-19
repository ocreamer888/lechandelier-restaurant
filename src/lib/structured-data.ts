import type { SiteSettings } from './sanity';

interface RestaurantSchemaParams {
  settings?: SiteSettings | null;
  ratingValue?: number;
  reviewCount?: number;
}

interface MenuSchemaParams {
  menuSections?: Array<{
    name: string;
    description?: string;
  }>;
}

/**
 * Generates Restaurant Schema.org structured data
 * Following Google's best practices for local business markup
 */
export function generateRestaurantSchema({
  settings,
  ratingValue,
  reviewCount,
}: RestaurantSchemaParams = {}) {
  const baseUrl = 'https://www.lechandelier.restaurant';
  
  // Use settings data if available, otherwise use fallbacks
  const contact = settings?.contact || {
    address: 'Los Yoses, San Jose, Costa Rica',
    phone: '+506 7130 0911',
    email: 'hello@lechandelier.restaurant',
  };

  const socialLinks = settings?.socialLinks || {
    facebook: 'https://facebook.com/lechandeliercr',
    instagram: 'https://instagram.com/lechandeliercr',
    twitter: 'https://twitter.com/lechandeliercr',
  };

  const openingHours = settings?.openingHours || [
    { day: 'Monday', time: '18:00 - 22:30' },
    { day: 'Tuesday', time: '18:00 - 22:30' },
    { day: 'Wednesday', time: '18:00 - 22:30' },
    { day: 'Thursday', time: '18:00 - 22:30' },
    { day: 'Friday', time: '18:00 - 22:30' },
    { day: 'Saturday', time: '18:00 - 22:30' },
    { day: 'Sunday', time: 'Closed' },
  ];

  // Convert opening hours to Schema.org format
  const openingHoursSpecification = openingHours
    .filter((item) => item.time !== 'Closed')
    .map((item) => {
      const [opens, closes] = item.time.split(' - ');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: item.day,
        opens,
        closes,
      };
    });

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${baseUrl}/#restaurant`,
    name: 'Le Chandelier',
    description:
      'Le Chandelier illuminates Costa Rica with refined French-Swiss dining, masterfully crafted dishes, curated wines, and an ambiance of timeless elegance and warmth.',
    image: [
      `${baseUrl}/restaurante-le-chandelier-1.webp`,
      `${baseUrl}/restaurante-le-chandelier-2.webp`,
      `${baseUrl}/restaurante-le-chandelier-3.webp`,
    ],
    url: baseUrl,
    telephone: contact.phone,
    email: contact.email,
    priceRange: '$$$$',
    servesCuisine: ['French', 'Swiss'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Los Yoses',
      addressLocality: 'San José',
      addressRegion: 'San José',
      addressCountry: 'CR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.9293391,
      longitude: -84.0589315,
    },
    openingHoursSpecification,
    sameAs: [socialLinks.facebook, socialLinks.instagram, socialLinks.twitter],
    hasMap: 'https://www.google.com/maps/place/Le+Chandelier/@9.9293391,-84.0589315,17z',
  };

  // Add aggregate rating if provided
  if (ratingValue && reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

/**
 * Generates Menu Schema.org structured data
 * For the restaurant's menu page
 */
export function generateMenuSchema({ menuSections = [] }: MenuSchemaParams = {}) {
  const baseUrl = 'https://www.lechandelier.restaurant';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${baseUrl}/menu#menu`,
    name: 'Le Chandelier Menu',
    description: 'French-Swiss fine dining menu featuring exquisite dishes and curated wines',
    inLanguage: ['en', 'es'],
    hasMenuSection: menuSections.map((section, index) => ({
      '@type': 'MenuSection',
      '@id': `${baseUrl}/menu#section-${index}`,
      name: section.name,
      description: section.description || '',
    })),
  };

  return schema;
}

/**
 * Generates BreadcrumbList Schema.org structured data
 * For navigation hierarchy
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const baseUrl = 'https://www.lechandelier.restaurant';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generates Organization Schema.org structured data
 * For overall brand identity
 */
export function generateOrganizationSchema(settings?: SiteSettings | null) {
  const baseUrl = 'https://www.lechandelier.restaurant';
  
  const socialLinks = settings?.socialLinks || {
    facebook: 'https://facebook.com/lechandeliercr',
    instagram: 'https://instagram.com/lechandeliercr',
    twitter: 'https://twitter.com/lechandeliercr',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Le Chandelier',
    url: baseUrl,
    logo: `${baseUrl}/Chandelier.png`,
    image: `${baseUrl}/restaurante-le-chandelier-1.webp`,
    description:
      'French-Swiss fine dining restaurant in San José, Costa Rica',
    sameAs: [socialLinks.facebook, socialLinks.instagram, socialLinks.twitter],
  };
}

