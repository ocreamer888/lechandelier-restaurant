import Menu3 from './Menu3';
import { getFoodMenu } from '@/lib/sanity';
import { getLocale } from 'next-intl/server';

type Category = "Entradas" | "Platos Fuertes" | "Postres";

type Item = {
  id: string;
  name: string;
  nameEnglish: string;
  price: string;
  description: string;
  image: string;
};

export default async function Menu3Wrapper() {
  const foodData = await getFoodMenu();
  const locale = await getLocale();

  // Transform Sanity data to match Menu3 component structure
  let transformedData: Record<Category, Item[]> | undefined;

  if (foodData?.categories) {
    transformedData = {} as Record<Category, Item[]>;

    foodData.categories.forEach((category) => {
      const categoryName = category.name as Category;

      // Only process Spanish categories that Menu3 expects
      if (categoryName === 'Entradas' || categoryName === 'Platos Fuertes' || categoryName === 'Postres') {
        transformedData![categoryName] = category.items.map((item, idx) => ({
          id: `${categoryName}-${idx}`,
          name: item.nameSpanish,
          nameEnglish: item.name,
          description: item.description,
          price: item.price,
          image: item.image || '/restaurante-le-chandelier-2.webp',
        }));
      }
    });
  }

  return <Menu3 data={transformedData} locale={locale} />;
}


