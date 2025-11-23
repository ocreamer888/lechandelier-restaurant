import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation for Le Chandelier Restaurant
 * Optimized for Costa Rica restaurant searches
 * Supports bilingual content (English/Spanish)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.lechandelier.restaurant';
    const lastModified = new Date();

    // Define all routes with their configurations
    const routes: Array<{
        path: string;
        priority: number;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    }> = [
            // Homepage - highest priority
            { path: '', priority: 1.0, changeFrequency: 'daily' },

            // Main pages - high priority
            { path: '/menu', priority: 0.9, changeFrequency: 'weekly' },
            { path: '/reservation', priority: 0.9, changeFrequency: 'daily' },
            { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
            { path: '/events', priority: 0.8, changeFrequency: 'weekly' },
            { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
        ];

    const locales = ['en', 'es'];

    // Generate sitemap entries for all routes in both languages
    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        locales.forEach((locale) => {
            const url = `${baseUrl}/${locale}${route.path}`;

            sitemapEntries.push({
                url,
                lastModified,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                // Add alternate language versions
                alternates: {
                    languages: {
                        en: `${baseUrl}/en${route.path}`,
                        es: `${baseUrl}/es${route.path}`,
                    },
                },
            });
        });
    });

    return sitemapEntries;
}
