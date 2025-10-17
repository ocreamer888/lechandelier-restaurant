/**
 * Programmatic Data Import Script
 * 
 * Usage: SANITY_WRITE_TOKEN=your_token_here node scripts/import-data.mjs
 * 
 * This will import all data into your Sanity dataset
 * 
 * To get a write token:
 * 1. Go to https://sanity.io/manage
 * 2. Select your project
 * 3. Go to Settings → API → Tokens
 * 4. Click "Add API Token"
 * 5. Name: "Import Script"
 * 6. Permissions: "Editor" or "Administrator"
 * 7. Copy the token and use it in the command above
 */

import { createClient } from '@sanity/client';

// Check for token
if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ ERROR: SANITY_WRITE_TOKEN is not set!');
  console.error('');
  console.error('Please run the script with your Sanity write token:');
  console.error('  SANITY_WRITE_TOKEN=your_token_here node scripts/import-data.mjs');
  console.error('');
  console.error('To create a token:');
  console.error('  1. Go to https://sanity.io/manage');
  console.error('  2. Select your project');
  console.error('  3. Go to Settings → API → Tokens');
  console.error('  4. Click "Add API Token"');
  console.error('  5. Set permissions to "Editor"');
  console.error('');
  process.exit(1);
}

const client = createClient({
  projectId: 'dte651bc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// Import data structures
const SITE_SETTINGS = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  title: 'Le Chandelier',
  openingHours: [
    { day: 'Monday', time: '18:00 - 22:30' },
    { day: 'Tuesday', time: '18:00 - 22:30' },
    { day: 'Wednesday', time: '18:00 - 22:30' },
    { day: 'Thursday', time: '18:00 - 22:30' },
    { day: 'Friday', time: '18:00 - 22:30' },
    { day: 'Saturday', time: '18:00 - 22:30' },
    { day: 'Sunday', time: 'Closed' },
  ],
  hoursText: 'Open Mon–Sat · 6:30pm–11pm',
  contact: {
    address: 'Los Yoses, San Jose, Costa Rica',
    phone: '+506 7130 0911',
    email: 'hello@lechandelier.restaurant',
    mapsLink: 'https://www.google.com/maps/place/Le+Chandelier/@9.9293391,-84.0589315,17z',
  },
  socialLinks: {
    facebook: 'https://facebook.com/lechandeliercr',
    instagram: 'https://instagram.com/lechandeliercr',
    twitter: 'https://twitter.com/lechandeliercr',
  },
};

const FOOD_MENU = {
  _type: 'foodMenu',
  _id: 'foodMenu',
  title: 'Food Menu',
  categories: [
    {
      name: 'Entradas',
      items: [
        { 
          name: "Ensalada César con Salmón", 
          nameEnglish: "Caesar salad with Salmon",
          price: "₡7.500", 
          description: "Caesar salad with Salmon.", 
        },
        { 
          name: "Ensalada de Pera y Queso de Cabra", 
          nameEnglish: "Pear and Goat Cheese Salad",
          price: "₡6.900", 
          description: "Pear and Goat Cheese Salad.", 
        },
        { 
          name: "Carpaccio, Jamón Serrano y Salmón", 
          nameEnglish: "Carpaccio, Serrano Ham and Salmon",
          price: "₡13.500", 
          description: "Carpaccio, Serrano Ham and Salmon.", 
        },
        { 
          name: "Bombón de Salmón", 
          nameEnglish: "Salmon and Advovado Bundle",
          price: "₡13.500", 
          description: "Salmon and Advovado Bundle.", 
        },
        { 
          name: "Ceviche de Marlín Blanco", 
          nameEnglish: "White Marlin Ceviche",
          price: "₡11.500", 
          description: "White Marlin Ceviche.", 
        },
        { 
          name: "Cazuela de Caracoles Bourguignon", 
          nameEnglish: "Bourguignon Snail Casserole",
          price: "₡14.500", 
          description: "Bourguignon Snail Casserole.", 
        },
        { 
          name: "Pulpo en Crema de Ajo y Pimentón", 
          nameEnglish: "Octopus in Garlic and Paprika Cream",
          price: "₡13.500", 
          description: "Octopus in Garlic and Paprika Cream.", 
        },
        { 
          name: "Sopa de Cebolla Gratinada", 
          nameEnglish: "French Onion Soup",
          price: "₡6.500", 
          description: "French Onion Soup.", 
        },
        { 
          name: "Crema de Hongos Crimini", 
          nameEnglish: "Crimini Mushroom Cream Soup",
          price: "₡6.500", 
          description: "Crimini Mushroom Cream Soup.", 
        },
        { 
          name: "Crema de Pejibaye", 
          nameEnglish: "Cream of Peach Palm Soup",
          price: "₡6.500", 
          description: "Cream of Peach Palm Soup.", 
        },
        { 
          name: "Crema de Mariscos", 
          nameEnglish: "Sea Food Cream",
          price: "₡7.500", 
          description: "Sea Food Cream.", 
        },
        { 
          name: "Crema de Tomate", 
          nameEnglish: "Cream of Tomato Soup",
          price: "₡6.500", 
          description: "Cream of Tomato Soup.", 
        },
        { 
          name: "Queso Camembert Frito", 
          nameEnglish: "Fried Camembert Cheese",
          price: "₡9.500", 
          description: "Fried Camembert Cheese.", 
        },
      ],
    },
    {
      name: 'Platos Fuertes',
      items: [
        { 
          name: "Lomito en Salsa de Pimienta Negra", 
          nameEnglish: "Beef Tenderloin in Black Pepper sauce",
          price: "₡16.500", 
          description: "Beef Tenderloin in Black Pepper sauce.", 
        },
        { 
          name: "New York Angus Nacional", 
          nameEnglish: "New York Strip Angus",
          price: "₡22.500", 
          description: "New York Strip Angus.", 
        },
        { 
          name: "Mar y Tierra Provincial", 
          nameEnglish: "Surf and Turf",
          price: "₡22.500", 
          description: "Surf and Turf.", 
        },
        { 
          name: "Rib Eye Angus Nacional", 
          nameEnglish: "Angus Ribeye Steak",
          price: "₡22.000", 
          description: "Angus Ribeye Steak.", 
        },
        { 
          name: "Lomito de Res Stroganoff", 
          nameEnglish: "Beef Stroganoff",
          price: "₡16.500", 
          description: "Beef Stroganoff.", 
        },
        { 
          name: "Pato Asado en Salsa de Maracuyá o Naranja", 
          nameEnglish: "Roasted Duck with Sauce of your Choice",
          price: "₡18.500", 
          description: "Roasted Duck with Sauce of your Choice.", 
        },
        { 
          name: "Corvina Reina en Costra de Almendras", 
          nameEnglish: "Queen Sea Bass in Almond Crust",
          price: "₡15.500", 
          description: "Queen Sea Bass in Almond Crust.", 
        },
        { 
          name: "Lengua en Salsa (Alcaparras o Pomodoro)", 
          nameEnglish: "Beef Tongue Capers or Tomato sauce",
          price: "₡15.500", 
          description: "Beef Tongue Capers or Tomato sauce.", 
        },
        { 
          name: "Salmón Grille en Salsa de Dátiles", 
          nameEnglish: "Grilled Salmon in Date Sauce",
          price: "₡15.500", 
          description: "Grilled Salmon in Date Sauce.", 
        },
        { 
          name: "Cola de Langosta 250g", 
          nameEnglish: "Lobster Tail 250g",
          price: "₡28.500", 
          description: "Lobster Tail 250g.", 
        },
        { 
          name: "Camarones Jumbo en Crema de Eneldo", 
          nameEnglish: "Grilled Jumbo Shrimp in Dill Sauce",
          price: "₡23.500", 
          description: "Grilled Jumbo Shrimp in Dill Sauce.", 
        },
        { 
          name: "Fondue de Queso (2 personas)", 
          nameEnglish: "Cheese Fondue for 2 people",
          price: "₡38.000", 
          description: "Cheese Fondue for 2 people.", 
        },
      ],
    },
    {
      name: 'Postres',
      items: [
        { 
          name: "Crème Brûlée con frutos Rojos", 
          nameEnglish: "Burnt Cream with Red Fruits",
          price: "₡6.500", 
          description: "Burnt Cream with Red Fruits.", 
        },
        { 
          name: "Mousse de Chocolate Suiza", 
          nameEnglish: "Chocolate Mousse",
          price: "₡6.500", 
          description: "Chocolate Mousse.", 
        },
        { 
          name: "Flan de Coco Costarricense", 
          nameEnglish: "Coconut Flan, Typical Costa Rican Dessert!",
          price: "₡6.500", 
          description: "Coconut Flan, Typical Costa Rican Dessert!", 
        },
        { 
          name: "Práline de Almendras y Nueces", 
          nameEnglish: "Almond, Praline Iced Cream",
          price: "₡6.500", 
          description: "Almond, Praline Iced Cream.", 
        },
        { 
          name: "Rocas de Amaretto", 
          nameEnglish: "Amaretto Iced Cream Roc",
          price: "₡6.500", 
          description: "Amaretto Iced Cream Roc.", 
        },
      ],
    },
  ],
};

const FEATURED_DRINK = {
  _type: 'featuredDrink',
  _id: 'house-sangria',
  title: 'House Sangria',
  description: 'Our signature sangria crafted with premium red wine, fresh seasonal fruits, and a touch of brandy. Perfect for sharing.',
  order: 0,
  // Note: Image will need to be uploaded manually through Sanity Studio
  // or you can use the image upload API
};

// Drinks Menu data (mirrors src/components/DrinksMenu.tsx FALLBACK_DATA)
const DRINKS_MENU = {
  _type: 'drinksMenu',
  _id: 'drinksMenu',
  title: 'Drinks Menu',
  categories: [
    {
      _key: 'champagne_and_sparkling',
      name: 'Champagne & Sparkling',
      subcategories: [
        {
          _key: 'all',
          name: 'All',
          items: [
            { _key: 'fredenet_cordon_negro', name: 'Fredenet Cordon Negro', price: '₡35,000' },
            { _key: 'veuve_cliquot_brut', name: 'Veuve Cliquot Brut', price: '₡104,550' },
            { _key: 'moet_et_chandon', name: 'Moet et Chandon', price: '₡115,620' },
            { _key: 'dom_perignon', name: 'Dom Perignon', price: '₡328,000' },
          ],
        },
      ],
    },
    {
      _key: 'white_wines',
      name: 'White Wines',
      subcategories: [
        {
          _key: 'aromatic',
          name: 'Aromatic',
          items: [
            { _key: 'casillero_del_diablo_white', name: 'Casillero del Diablo', price: '₡21,525' },
            { _key: 'casillero_del_diablo_half', name: 'Casillero del Diablo Half Bottle', price: '₡11,435' },
            { _key: 'luigi_bosca_white', name: 'Luigi Bosca', price: '₡33,032' },
            { _key: 'marques_de_casa_concha_white', name: 'Marques de Casa Concha', price: '₡35,000' },
            { _key: 'navarro_correas_private_collection_white', name: 'Navarro Correas Private Collection', price: '₡24,600' },
            { _key: 'louis_jadot_chablis', name: 'Louis Jadot Chablis', price: '₡49,200' },
          ],
        },
        {
          _key: 'sweet',
          name: 'Sweet',
          items: [
            { _key: 'amelia_white', name: 'Amelia', price: '₡83,025' },
            { _key: 'marques_de_caceres_verdejo_rueda', name: 'Marques de Caceres Verdejo Rueda', price: '₡22,755' },
          ],
        },
        {
          _key: 'smooth_white',
          name: 'Smooth',
          items: [
            { _key: 'beringer_white_zinfandel', name: 'Beringer White Zinfandel', price: '₡21,525' },
            { _key: 'sartori_villa_mura_pinot_grigio', name: 'Sartori Villa Mura Pinot Grigio', price: '₡33,525' },
            { _key: 'canti_white', name: 'Canti', price: '₡23,985' },
            { _key: 'a_vaca_cuca_albarino', name: 'A Vaca Cuca Albarino', price: '₡36,285' },
          ],
        },
      ],
    },
    {
      _key: 'red_wines',
      name: 'Red Wines',
      subcategories: [
        {
          _key: 'smooth_red',
          name: 'Smooth',
          items: [
            { _key: 'casillero_del_diablo_red', name: 'Casillero del Diablo', price: '₡22,755' },
            { _key: 'marques_de_casa_concha_red', name: 'Marques de Casa Concha', price: '₡39,000' },
            { _key: 'luigi_bosca_red', name: 'Luigi Bosca', price: '₡22,755' },
            { _key: 'don_melchor', name: 'Don Melchor', price: '₡163,500' },
          ],
        },
        {
          _key: 'noble',
          name: 'Noble',
          items: [
            { _key: 'navarro_correas_private_collection_red', name: 'Navarro Correas Private Collection', price: '₡24,000' },
            { _key: 'luigi_bosca_noble', name: 'Luigi Bosca', price: '₡32,595' },
            { _key: 'las_perdices', name: 'Las Perdices', price: '₡23,500' },
            { _key: 'reserva_las_perdices', name: 'Reserva Las Perdices', price: '₡27,500' },
            { _key: 'gran_reserva_don_juan_90', name: 'Gran Reserva Don Juan 90%', price: '₡43,665' },
          ],
        },
        {
          _key: 'merlot',
          name: 'Merlot',
          items: [
            { _key: 'casillero_del_diablo_merlot', name: 'Casillero del Diablo', price: '₡22,755' },
            { _key: 'marques_de_casa_concha_merlot', name: 'Marques de Casa Concha', price: '₡38,000' },
            { _key: 'barton_guestier_st_emilion', name: 'Barton & Guestier St. Emilion', price: '₡43,665' },
          ],
        },
        {
          _key: 'pinot_noir',
          name: 'Pinot Noir',
          items: [
            { _key: 'louis_jadot_bourgogne', name: 'Louis Jadot Bourgogne', price: '₡53,000' },
            { _key: 'marques_de_caceres_gaudium', name: 'Marques de Caceres Gaudium', price: '₡195,000' },
          ],
        },
        {
          _key: 'oak_aged',
          name: 'Oak Aged',
          items: [
            { _key: 'vina_mayor_reserva_ribera', name: 'Viña Mayor Reserva D.O. Ribera del Duero', price: '₡63,345' },
            { _key: 'vina_mayor_crianza_ribera', name: 'Viña Mayor Crianza D.O. Ribera del Duero', price: '₡39,360' },
            { _key: 'marques_de_caceres_crianza_rioja', name: 'Marques de Caceres Crianza D.O.CA. Rioja', price: '₡39,360' },
            { _key: 'marques_de_caceres_crianza_half', name: 'Marques de Caceres Crianza Rioja Half Bottle', price: '₡16,065' },
            { _key: 'marques_de_caceres_reserva_rioja', name: 'Marques de Caceres Reserva D.O.C. Rioja', price: '₡47,355' },
            { _key: 'marques_de_caceres_gran_reserva_rioja', name: 'Marques de Caceres Gran Reserva D.O.C. Rioja', price: '₡55,350' },
            { _key: 'le_gran_verdus_bordeaux', name: 'Le Gran Verdus Bordeaux', price: '₡19,680' },
          ],
        },
      ],
    },
    {
      _key: 'others',
      name: 'Others',
      subcategories: [
        {
          _key: 'all_others',
          name: 'All',
          items: [
            { _key: 'house_wine_glass', name: 'House Wine Glass', price: '₡4,920' },
            { _key: 'sangria_pitcher', name: 'Sangria Pitcher', price: '₡19,065' },
            { _key: 'sangria_glass', name: 'Sangria Glass', price: '₡4,920' },
          ],
        },
      ],
    },
  ],
};

async function importData() {
  try {
    console.log('🚀 Starting data import to Sanity...');
    console.log('Project ID:', 'dte651bc');
    console.log('Dataset:', 'production');
    console.log('');
    
    // Import Site Settings
    console.log('📝 Importing site settings...');
    await client.createOrReplace(SITE_SETTINGS);
    console.log('✅ Site settings imported successfully');
    console.log('');
    
    // Import Food Menu
    console.log('🍽️  Importing food menu...');
    const foodMenuItemCount = FOOD_MENU.categories.reduce((acc, cat) => acc + cat.items.length, 0);
    await client.createOrReplace(FOOD_MENU);
    console.log(`✅ Food menu imported successfully (${FOOD_MENU.categories.length} categories, ${foodMenuItemCount} items)`);
    console.log('');
    
    // Import Featured Drink
    console.log('🍷 Importing featured drink...');
    await client.createOrReplace(FEATURED_DRINK);
    console.log('✅ Featured drink imported successfully');
    console.log('⚠️  Note: Upload the sangria image manually in Sanity Studio');
    console.log('');
    
    // Import Drinks Menu
    console.log('🥂 Importing drinks menu...');
    // compute stats
    const drinksCategoryCount = DRINKS_MENU.categories.length;
    const drinksSubCount = DRINKS_MENU.categories.reduce((a, c) => a + c.subcategories.length, 0);
    const drinksItemCount = DRINKS_MENU.categories.reduce((a, c) => a + c.subcategories.reduce((sa, sc) => sa + sc.items.length, 0), 0);
    await client.createOrReplace(DRINKS_MENU);
    console.log(`✅ Drinks menu imported successfully (${drinksCategoryCount} categories, ${drinksSubCount} subcategories, ${drinksItemCount} items)`);
    console.log('');
    
    console.log('🎉 All data imported successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Go to your Sanity Studio at http://localhost:3000/studio');
    console.log('2. Upload the sangria image to the Featured Drink document');
    console.log('3. Verify all data looks correct');
    console.log('4. Publish any changes');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ Error importing data:');
    console.error('');
    if (error.statusCode === 403) {
      console.error('Permission denied. Make sure your token has "Editor" or "Administrator" permissions.');
      console.error('');
      console.error('To fix:');
      console.error('1. Go to https://sanity.io/manage');
      console.error('2. Select your project');
      console.error('3. Go to Settings → API → Tokens');
      console.error('4. Delete the old token and create a new one with "Editor" permissions');
    } else if (error.statusCode === 401) {
      console.error('Invalid token. Please check your SANITY_WRITE_TOKEN.');
    } else {
      console.error(error.message || error);
    }
    console.error('');
    process.exit(1);
  }
}

importData();

