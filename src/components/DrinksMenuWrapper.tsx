import DrinksMenu from './DrinksMenu';
import { getDrinksMenu } from '@/lib/sanity';

type Category = string;

type SubCategory = {
  name: string;
  items: {
    id?: string;
    name: string;
    price: string;
  }[];
};

export default async function DrinksMenuWrapper() {
  const drinksData = await getDrinksMenu();
  
  // Transform Sanity data to match component structure
  let transformedData: Record<Category, SubCategory[]> | undefined;
  
  if (drinksData?.categories) {
    transformedData = {} as Record<Category, SubCategory[]>;
    
    drinksData.categories.forEach((category) => {
      const categoryName = category.name as Category;
      transformedData![categoryName] = category.subcategories.map((sub) => ({
        name: sub.name,
        items: sub.items.map((item, idx) => ({
          id: `${categoryName}-${sub.name}-${idx}`,
          name: item.name,
          price: item.price,
        })),
      }));
    });
  }
  
  return <DrinksMenu data={transformedData} />;
}

