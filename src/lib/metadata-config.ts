import { Metadata } from 'next';

/**
 * Centralized metadata configuration for Le Chandelier Restaurant
 * Optimized for Costa Rica restaurant searches
 * Supports SEO best practices for 2025
 */

export const SITE_CONFIG = {
    name: 'Le Chandelier',
    url: 'https://www.lechandelier.restaurant',
    location: {
        country: 'Costa Rica',
        region: 'San José',
        city: 'San José',
        neighborhood: 'Los Yoses',
        full: 'Los Yoses, San José, Costa Rica',
    },
    social: {
        facebook: 'https://facebook.com/lechandeliercr',
        instagram: 'https://instagram.com/lechandeliercr',
        twitter: 'https://x.com/lechandeliercr',
    },
    contact: {
        phone: '+506 7130 0911',
        email: 'reservaciones@lechandelier.restaurant',
    },
} as const;

/**
 * Generate comprehensive metadata for pages
 */
export function generatePageMetadata({
    title,
    description,
    locale = 'es',
    path = '',
    image = '/restaurante-le-chandelier-1.webp',
    keywords = [],
    type = 'website',
}: {
    title: string;
    description: string;
    locale?: string;
    path?: string;
    image?: string;
    keywords?: string[];
    type?: 'website' | 'article';
}): Metadata {
    const url = `${SITE_CONFIG.url}/${locale}${path}`;
    const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

    // Default keywords focused on Costa Rica
    const defaultKeywords = locale === 'es'
        ? [
            'restaurante Costa Rica',
            'restaurante francés San José',
            'restaurante fino Costa Rica',
            'Le Chandelier',
            'cocina francesa',
            'cocina suiza',
            'mejor restaurante San José',
            'restaurante elegante Costa Rica',
            'reservaciones restaurante',
            'Los Yoses restaurante',
        ]
        : [
            'restaurant Costa Rica',
            'French restaurant San José',
            'fine dining Costa Rica',
            'Le Chandelier',
            'French cuisine',
            'Swiss cuisine',
            'best restaurant San José',
            'elegant restaurant Costa Rica',
            'restaurant reservations',
            'Los Yoses restaurant',
        ];

    const allKeywords = [...defaultKeywords, ...keywords];

    return {
        metadataBase: new URL(SITE_CONFIG.url),
        title,
        description,
        keywords: allKeywords.join(', '),
        authors: [{ name: 'Le Chandelier Restaurant' }],
        creator: 'Le Chandelier',
        publisher: 'Le Chandelier Restaurant',

        // Canonical URL
        alternates: {
            canonical: url,
            languages: {
                en: `${SITE_CONFIG.url}/en${path}`,
                es: `${SITE_CONFIG.url}/es${path}`,
            },
        },

        // OpenGraph metadata for social sharing
        openGraph: {
            type,
            locale: locale === 'es' ? 'es_CR' : 'en_US',
            alternateLocale: locale === 'es' ? 'en_US' : 'es_CR',
            url,
            title,
            description,
            siteName: SITE_CONFIG.name,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            countryName: SITE_CONFIG.location.country,
        },

        // Twitter Card metadata
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
            creator: '@lechandeliercr',
            site: '@lechandeliercr',
        },

        // Geographic metadata
        other: {
            'geo.region': 'CR-SJ', // Costa Rica, San José
            'geo.placename': 'San José',
            'geo.position': '9.9293391;-84.0589315',
            'ICBM': '9.9293391, -84.0589315',
        },

        // Verification tags (to be filled in by user)
        verification: {
            google: '', // User should add their Google Search Console verification code
            // bing: '', // User should add their Bing Webmaster verification code
        },

        // Robots directives
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // App metadata
        applicationName: 'Le Chandelier Restaurant',

        // Icons
        icons: {
            icon: '/Chandelier.png',
            apple: '/Chandelier.png',
        },
    };
}

/**
 * Get locale-specific titles for common pages
 */
export const PAGE_TITLES = {
    en: {
        home: 'Le Chandelier — Premier French-Swiss Restaurant in San José, Costa Rica',
        menu: 'Menu — Le Chandelier French-Swiss Cuisine | San José, Costa Rica',
        about: 'About Us — Le Chandelier French-Swiss Restaurant | Costa Rica',
        reservation: 'Reserve a Table — Le Chandelier | San José, Costa Rica',
        events: 'Private Events — Le Chandelier French-Swiss Restaurant | Costa Rica',
        contact: 'Contact & Location — Le Chandelier | San José, Costa Rica',
    },
    es: {
        home: 'Le Chandelier — Restaurante Franco-Suizo Premier en San José, Costa Rica',
        menu: 'Menú — Cocina Franco-Suiza Le Chandelier | San José, Costa Rica',
        about: 'Sobre Nosotros — Restaurante Franco-Suizo Le Chandelier | Costa Rica',
        reservation: 'Reservar Mesa — Le Chandelier | San José, Costa Rica',
        events: 'Eventos Privados — Restaurante Franco-Suizo Le Chandelier | Costa Rica',
        contact: 'Contacto y Ubicación — Le Chandelier | San José, Costa Rica',
    },
} as const;

/**
 * Get locale-specific descriptions for common pages
 */
export const PAGE_DESCRIPTIONS = {
    en: {
        home: 'Experience Le Chandelier, the premier French-Swiss restaurant in San José, Costa Rica. Masterfully crafted dishes, curated wines, and timeless elegance in the heart of Los Yoses. Reserve your table today.',
        menu: 'Explore Le Chandelier\'s exquisite French-Swiss menu featuring seasonal ingredients, classic techniques, and innovative cuisine. Fine dining in San José, Costa Rica.',
        about: 'Discover the story of Le Chandelier, Costa Rica\'s finest French-Swiss restaurant. Learn about our chefs, philosophy, and commitment to culinary excellence in San José.',
        reservation: 'Reserve your table at Le Chandelier, San José\'s premier French-Swiss restaurant. Easy online booking for the finest dining experience in Costa Rica.',
        events: 'Host your private event at Le Chandelier. From corporate gatherings to intimate celebrations, experience French-Swiss elegance in San José, Costa Rica.',
        contact: 'Find Le Chandelier in Los Yoses, San José, Costa Rica. Get directions, contact information, and hours for Costa Rica\'s premier French-Swiss restaurant.',
    },
    es: {
        home: 'Experimente Le Chandelier, el restaurante franco-suizo premier en San José, Costa Rica. Platos magistralmente elaborados, vinos curados y elegancia atemporal en el corazón de Los Yoses. Reserve su mesa hoy.',
        menu: 'Explore el exquisito menú franco-suizo de Le Chandelier con ingredientes de temporada, técnicas clásicas y cocina innovadora. Gastronomía fina en San José, Costa Rica.',
        about: 'Descubra la historia de Le Chandelier, el mejor restaurante franco-suizo de Costa Rica. Conozca a nuestros chefs, filosofía y compromiso con la excelencia culinaria en San José.',
        reservation: 'Reserve su mesa en Le Chandelier, el restaurante franco-suizo premier de San José. Reservación en línea fácil para la mejor experiencia gastronómica en Costa Rica.',
        events: 'Organice su evento privado en Le Chandelier. Desde reuniones corporativas hasta celebraciones íntimas, experimente la elegancia franco-suiza en San José, Costa Rica.',
        contact: 'Encuentre Le Chandelier en Los Yoses, San José, Costa Rica. Obtenga direcciones, información de contacto y horarios del restaurante franco-suizo premier de Costa Rica.',
    },
} as const;
