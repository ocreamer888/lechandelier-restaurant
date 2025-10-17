import { client } from './sanity.client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Type definitions for our content
export type DrinkItem = {
  name: string;
  price: string;
};

export type DrinkSubCategory = {
  name: string;
  items: DrinkItem[];
};

export type DrinkCategory = {
  name: string;
  subcategories: DrinkSubCategory[];
};

export type DrinksMenuData = {
  categories: DrinkCategory[];
};

export type FoodMenuItem = {
  name: string;
  nameEnglish?: string;
  description: string;
  price: string;
  image?: string;
  tags?: string[];
};

export type FoodCategory = {
  name: string;
  items: FoodMenuItem[];
};

export type FoodMenuData = {
  categories: FoodCategory[];
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  order: number;
};

export type Event = {
  _id: string;
  title: string;
  description?: string;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  order: number;
};

export type FeaturedDrink = {
  _id: string;
  title: string;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  order: number;
};

export type SiteSettings = {
  title: string;
  openingHours: {
    day: string;
    time: string;
  }[];
  hoursText: string;
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

// Fetch functions
export async function getDrinksMenu(): Promise<DrinksMenuData | null> {
  try {
    const data = await client.fetch<DrinksMenuData>(
      `*[_type == "drinksMenu" && _id == "drinksMenu"][0]{
        categories[]{
          name,
          subcategories[]{
            name,
            items[]{
              name,
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
          items[]{
            name,
            nameEnglish,
            description,
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
      `*[_type == "teamMember"] | order(order asc){
        _id,
        name,
        role,
        image,
        order
      }`,
      {},
      {
        next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
      }
    );
    console.log('getTeamMembers - Fetched:', data.length, 'members');
    return data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const data = await client.fetch<Event[]>(
      `*[_type == "event"] | order(order asc){
        _id,
        title,
        description,
        image,
        order
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
          time
        },
        hoursText,
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
        next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 }, // No cache in dev, 1 hour in production
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
      `*[_type == "featuredDrink"] | order(order asc){
        _id,
        title,
        description,
        image,
        order
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

