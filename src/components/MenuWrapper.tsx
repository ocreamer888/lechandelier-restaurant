import Menu from './Menu';
import { getFoodMenu } from '@/lib/sanity';

type Category = "Appetizers" | "Pasta" | "Pizza" | "Salads" | "Soups" | "Desserts";

type MenuItem = {
  id?: string;
  name: string;
  price: string;
  description: string;
  tags?: Array<"Vegan" | "Vegetarian" | "Spicy" | "Gluten‑Free">;
};

export default async function MenuWrapper() {
  const foodData = await getFoodMenu();
  
  // Transform Sanity data to match component structure
  let transformedData: Record<Category, MenuItem[]> | undefined;
  let categories: Category[] | undefined;
  
  if (foodData?.categories) {
    transformedData = {} as Record<Category, MenuItem[]>;
    categories = [];
    
    foodData.categories.forEach((category) => {
      const categoryName = category.name as Category;
      categories!.push(categoryName);
      transformedData![categoryName] = category.items.map((item, idx) => ({
        id: `${categoryName}-${idx}`,
        name: item.name,
        description: item.description,
        price: item.price,
        tags: item.tags as Array<"Vegan" | "Vegetarian" | "Spicy" | "Gluten‑Free"> | undefined,
      }));
    });
  }
  
  return <Menu data={transformedData} categories={categories} />;
}

