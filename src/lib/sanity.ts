import { client } from './sanity.client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Type definitions for our content with bilingual support
export type SanityImageRef = {
  asset: {
    _ref: string;
    _type: 'reference';
  };
};
export type DrinkItem = {
  name: string;
  nameSpanish: string;
  price: string;
};

export type DrinkSubCategory = {
  name: string;
  nameSpanish: string;
  items: DrinkItem[];
};

export type DrinkCategory = {
  name: string;
  nameSpanish: string;
  subcategories: DrinkSubCategory[];
};

export type DrinksMenuData = {
  categories: DrinkCategory[];
};

export type FoodMenuItem = {
  name: string;
  nameSpanish: string;
  description: string;
  descriptionSpanish: string;
  price: string;
  image?: string;
  tags?: string[];
};

export type FoodCategory = {
  name: string;
  nameSpanish: string;
  items: FoodMenuItem[];
};

export type FoodMenuData = {
  categories: FoodCategory[];
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  roleSpanish: string;
  bio?: string;
  bioSpanish?: string;
  image: SanityImageRef;
  displayOrder: number;
};

export type Event = {
  _id: string;
  title: string;
  titleSpanish: string;
  description?: string;
  descriptionSpanish?: string;
  image: SanityImageRef;
  date?: string;
  displayOrder: number;
};

export type FeaturedDrink = {
  _id: string;
  title: string;
  titleSpanish: string;
  description: string;
  descriptionSpanish: string;
  image: SanityImageRef;
  displayOrder: number;
};

export type SiteSettings = {
  title: string;
  openingHours: {
    day: string;
    daySpanish: string;
    time: string;
  }[];
  hoursText: string;
  hoursTextSpanish: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    mapsLink: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
};

// Language-aware fetch functions
export async function getDrinksMenu(): Promise<DrinksMenuData | null> {
  try {
    const data = await client.fetch<DrinksMenuData>(
      `*[_type == "drinksMenu" && _id == "drinksMenu"][0]{
        categories[]{
          name,
          nameSpanish,
          subcategories[]{
            name,
            nameSpanish,
            items[]{
              name,
              nameSpanish,
              price
            }
          }
        }
      }`,
      {},
      {
        next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching drinks menu:', error);
    return null;
  }
}

export async function getFoodMenu(): Promise<FoodMenuData | null> {
  try {
    const data = await client.fetch<FoodMenuData>(
      `*[_type == "foodMenu" && _id == "foodMenu"][0]{
        categories[]{
          name,
          nameSpanish,
          items[]{
            name,
            nameSpanish,
            description,
            descriptionSpanish,
            price,
            image,
            tags
          }
        }
      }`,
      {},
      {
        next: { revalidate: 3600 },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching food menu:', error);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const data = await client.fetch<TeamMember[]>(
      `*[_type == "teamMember"] | order(displayOrder asc){
        _id,
        name,
        role,
        roleSpanish,
        bio,
        bioSpanish,
        image,
        displayOrder
      }`,
      {},
      {
        next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const data = await client.fetch<Event[]>(
      `*[_type == "event"] | order(displayOrder asc){
        _id,
        title,
        titleSpanish,
        description,
        descriptionSpanish,
        image,
        date,
        displayOrder
      }`,
      {},
      {
        next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const data = await client.fetch<SiteSettings>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
        title,
        openingHours[]{
          day,
          daySpanish,
          time
        },
        hoursText,
        hoursTextSpanish,
        contact{
          address,
          phone,
          email,
          mapsLink
        },
        socialLinks{
          facebook,
          instagram,
          twitter
        }
      }`,
      {},
      {
        next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function getFeaturedDrinks(): Promise<FeaturedDrink[]> {
  try {
    const data = await client.fetch<FeaturedDrink[]>(
      `*[_type == "featuredDrink"] | order(displayOrder asc){
        _id,
        title,
        titleSpanish,
        description,
        descriptionSpanish,
        image,
        displayOrder
      }`,
      {},
      {
        next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching featured drinks:', error);
    return [];
  }
}

// Helper functions to get localized content
export function getLocalizedDrinkItem(item: DrinkItem, locale: 'en' | 'es'): { name: string; price: string } {
  return {
    name: locale === 'es' ? item.nameSpanish : item.name,
    price: item.price,
  };
}

export function getLocalizedDrinkSubCategory(subcategory: DrinkSubCategory, locale: 'en' | 'es'): { name: string; items: { name: string; price: string }[] } {
  return {
    name: locale === 'es' ? subcategory.nameSpanish : subcategory.name,
    items: subcategory.items.map(item => getLocalizedDrinkItem(item, locale)),
  };
}

export function getLocalizedDrinkCategory(category: DrinkCategory, locale: 'en' | 'es'): { name: string; subcategories: { name: string; items: { name: string; price: string }[] }[] } {
  return {
    name: locale === 'es' ? category.nameSpanish : category.name,
    subcategories: category.subcategories.map(sub => getLocalizedDrinkSubCategory(sub, locale)),
  };
}

export function getLocalizedFoodMenuItem(item: FoodMenuItem, locale: 'en' | 'es'): { name: string; description: string; price: string; image?: string; tags?: string[] } {
  return {
    name: locale === 'es' ? item.nameSpanish : item.name,
    description: locale === 'es' ? item.descriptionSpanish : item.description,
    price: item.price,
    image: item.image,
    tags: item.tags,
  };
}

export function getLocalizedFoodCategory(category: FoodCategory, locale: 'en' | 'es'): { name: string; items: { name: string; description: string; price: string; image?: string; tags?: string[] }[] } {
  return {
    name: locale === 'es' ? category.nameSpanish : category.name,
    items: category.items.map(item => getLocalizedFoodMenuItem(item, locale)),
  };
}

export function getLocalizedTeamMember(member: TeamMember, locale: 'en' | 'es'): { _id: string; name: string; role: string; bio?: string; image: SanityImageRef; displayOrder: number } {
  return {
    _id: member._id,
    name: member.name,
    role: locale === 'es' ? member.roleSpanish : member.role,
    bio: locale === 'es' ? member.bioSpanish : member.bio,
    image: member.image,
    displayOrder: member.displayOrder,
  };
}

export function getLocalizedEvent(event: Event, locale: 'en' | 'es'): { _id: string; title: string; description?: string; image: SanityImageRef; date?: string; displayOrder: number } {
  return {
    _id: event._id,
    title: locale === 'es' ? event.titleSpanish : event.title,
    description: locale === 'es' ? event.descriptionSpanish : event.description,
    image: event.image,
    date: event.date,
    displayOrder: event.displayOrder,
  };
}

export function getLocalizedSiteSettings(settings: SiteSettings, locale: 'en' | 'es'): SiteSettings {
  return {
    ...settings,
    openingHours: settings.openingHours.map(hours => ({
      ...hours,
      day: locale === 'es' ? hours.daySpanish : hours.day,
    })),
    hoursText: locale === 'es' ? settings.hoursTextSpanish : settings.hoursText,
  };
}

export function getLocalizedFeaturedDrink(drink: FeaturedDrink, locale: 'en' | 'es'): { _id: string; title: string; description: string; image: SanityImageRef; displayOrder: number } {
  return {
    _id: drink._id,
    title: locale === 'es' ? drink.titleSpanish : drink.title,
    description: locale === 'es' ? drink.descriptionSpanish : drink.description,
    image: drink.image,
    displayOrder: drink.displayOrder,
  };
}

