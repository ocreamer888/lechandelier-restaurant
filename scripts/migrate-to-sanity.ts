/**
 * Data Migration Script for Sanity CMS
 * 
 * This script contains the existing hardcoded data formatted for easy
 * copy-paste into Sanity Studio. 
 * 
 * Note: This is a reference file. Data should be manually entered into
 * Sanity Studio at http://localhost:3000/studio
 */

export const DRINKS_MENU_DATA = {
  _type: 'drinksMenu',
  _id: 'drinksMenu',
  title: 'Drinks Menu',
  categories: [
    {
      name: 'Champagne & Sparkling',
      subcategories: [
        {
          name: 'All',
          items: [
            { name: 'Fredenet Cordon Negro', price: '₡35,000' },
            { name: 'Veuve Cliquot Brut', price: '₡104,550' },
            { name: 'Moet et Chandon', price: '₡115,620' },
            { name: 'Dom Perignon', price: '₡328,000' },
          ],
        },
      ],
    },
    {
      name: 'White Wines',
      subcategories: [
        {
          name: 'Aromatic',
          items: [
            { name: 'Casillero del Diablo', price: '₡21,525' },
            { name: 'Casillero del Diablo Half Bottle', price: '₡11,435' },
            { name: 'Luigi Bosca', price: '₡33,032' },
            { name: 'Marques de Casa Concha', price: '₡35,000' },
            { name: 'Navarro Correas Private Collection', price: '₡24,600' },
            { name: 'Louis Jadot Chablis', price: '₡49,200' },
          ],
        },
        {
          name: 'Sweet',
          items: [
            { name: 'Amelia', price: '₡83,025' },
            { name: 'Marques de Caceres Verdejo Rueda', price: '₡22,755' },
          ],
        },
        {
          name: 'Smooth',
          items: [
            { name: 'Beringer White Zinfandel', price: '₡21,525' },
            { name: 'Sartori Villa Mura Pinot Grigio', price: '₡33,525' },
            { name: 'Canti', price: '₡23,985' },
            { name: 'A Vaca Cuca Albarino', price: '₡36,285' },
          ],
        },
      ],
    },
    {
      name: 'Red Wines',
      subcategories: [
        {
          name: 'Smooth',
          items: [
            { name: 'Casillero del Diablo', price: '₡22,755' },
            { name: 'Marques de Casa Concha', price: '₡39,000' },
            { name: 'Luigi Bosca', price: '₡22,755' },
            { name: 'Don Melchor', price: '₡163,500' },
          ],
        },
        {
          name: 'Noble',
          items: [
            { name: 'Navarro Correas Private Collection', price: '₡24,000' },
            { name: 'Luigi Bosca', price: '₡32,595' },
            { name: 'Las Perdices', price: '₡23,500' },
            { name: 'Reserva Las Perdices', price: '₡27,500' },
            { name: 'Gran Reserva Don Juan 90%', price: '₡43,665' },
          ],
        },
        {
          name: 'Merlot',
          items: [
            { name: 'Casillero del Diablo', price: '₡22,755' },
            { name: 'Marques de Casa Concha', price: '₡38,000' },
            { name: 'Barton & Guestier St. Emilion', price: '₡43,665' },
          ],
        },
        {
          name: 'Pinot Noir',
          items: [
            { name: 'Louis Jadot Bourgogne', price: '₡53,000' },
            { name: 'Marques de Caceres Gaudium', price: '₡195,000' },
          ],
        },
        {
          name: 'Oak Aged',
          items: [
            { name: 'Viña Mayor Reserva D.O. Ribera del Duero', price: '₡63,345' },
            { name: 'Viña Mayor Crianza D.O. Ribera del Duero', price: '₡39,360' },
            { name: 'Marques de Caceres Crianza D.O.CA. Rioja', price: '₡39,360' },
            { name: 'Marques de Caceres Crianza Rioja Half Bottle', price: '₡16,065' },
            { name: 'Marques de Caceres Reserva D.O.C. Rioja', price: '₡47,355' },
            { name: 'Marques de Caceres Gran Reserva D.O.C. Rioja', price: '₡55,350' },
            { name: 'Le Gran Verdus Bordeaux', price: '₡19,680' },
          ],
        },
      ],
    },
    {
      name: 'Others',
      subcategories: [
        {
          name: 'All',
          items: [
            { name: 'House Wine Glass', price: '₡4,920' },
            { name: 'Sangria Pitcher', price: '₡19,065' },
            { name: 'Sangria Glass', price: '₡4,920' },
          ],
        },
      ],
    },
  ],
};

export const FOOD_MENU_DATA = {
  _type: 'foodMenu',
  _id: 'foodMenu',
  title: 'Food Menu',
  categories: [
    {
      name: 'Appetizers',
      items: [
        { name: 'Marinated Olives', price: '$6', description: 'Citrus zest, herbs de Provence, garlic confit.' },
        { name: 'Burrata', price: '$12', description: 'Heirloom tomatoes, basil oil, balsamic, toasted sourdough.', tags: ['Vegetarian'] },
        { name: 'Beef Carpaccio', price: '$14', description: 'Arugula, capers, parmigiano, lemon.' },
        { name: 'Mushroom Croquettes', price: '$10', description: 'Porcini, truffle aioli, chives.', tags: ['Vegetarian'] },
      ],
    },
    {
      name: 'Pasta',
      items: [
        { name: 'Gnocchi with Almonds', price: '$16', description: 'Brown butter, sage, toasted almonds, pecorino.' },
        { name: 'Spinach Ravioli', price: '$18', description: 'Ricotta, lemon, poppy seed, beurre blanc.', tags: ['Vegetarian'] },
        { name: 'Lasagna', price: '$17', description: 'Slow ragù, besciamella, parmigiano.' },
        { name: 'Carbonara Spaghetti', price: '$19', description: 'Guanciale, egg yolk, pecorino, black pepper.' },
      ],
    },
    {
      name: 'Pizza',
      items: [
        { name: 'Margherita', price: '$15', description: 'Tomato, fior di latte, basil, olive oil.', tags: ['Vegetarian'] },
        { name: 'Funghi', price: '$17', description: 'Mushroom trio, thyme, taleggio.' },
        { name: 'Diavola', price: '$18', description: 'Spicy salami, chili honey, provolone.', tags: ['Spicy'] },
        { name: 'Bianca', price: '$16', description: 'Ricotta, garlic, rosemary, mozzarella.', tags: ['Vegetarian'] },
      ],
    },
    {
      name: 'Salads',
      items: [
        { name: 'Caesar', price: '$13', description: 'Little gem, anchovy dressing, croutons, parmigiano.' },
        { name: 'Beet & Citrus', price: '$14', description: 'Goat cheese, pistachio, chicories.', tags: ['Vegetarian', 'Gluten‑Free'] },
        { name: 'Market Greens', price: '$12', description: 'Seasonal leaves, herbs, lemon vinaigrette.', tags: ['Vegan', 'Gluten‑Free'] },
      ],
    },
    {
      name: 'Soups',
      items: [
        { name: 'Tomato Soup', price: '$10', description: 'San Marzano, basil oil, crème fraîche.', tags: ['Vegetarian'] },
        { name: 'French Onion', price: '$12', description: 'Caramelized onions, gruyère toast.' },
      ],
    },
    {
      name: 'Desserts',
      items: [
        { name: 'Tiramisu', price: '$10', description: 'Espresso, mascarpone, cocoa.' },
        { name: 'Panna Cotta', price: '$10', description: 'Vanilla bean, macerated berries.', tags: ['Gluten‑Free'] },
        { name: 'Chocolate Fondant', price: '$11', description: 'Molten center, salted caramel gelato.' },
      ],
    },
  ],
};

export const TEAM_MEMBERS_DATA = [
  { name: 'Andrea Dubuis', role: 'Owner', image: '/Andrea-Retrato-Le-Chandelier.webp', order: 0 },
  { name: 'Federico Sanchez', role: 'Manager', image: '/Fede-Retrato-Le-Chandelier-3.webp', order: 1 },
  { name: 'Kevin Araya', role: 'Captain', image: '/Kevin-Retrato-Le-Chandelier-3.webp', order: 2 },
  { name: 'Luis Offer', role: 'Waiter', image: '/Luis-Retrato-Le-Chandelier-3.webp', order: 3 },
  { name: 'Edgar', role: 'Waiter', image: '/Edgar-Retrato-Le-Chandelier.webp', order: 4 },
  { name: 'Kenneth', role: 'Main Chef', image: '/Kenneth-Retrato-Le-Chandelier-2.webp', order: 5 },
  { name: 'Javier Baca', role: 'Chef', image: '/Javi-Retrato-Le-Chandelier.webp', order: 6 },
  { name: 'Lenner', role: 'Sub-Chef', image: '/Lenner-Retrato-Le-Chandelier-3.webp', order: 7 },
];

export const SITE_SETTINGS_DATA = {
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

export const EVENTS_DATA = [
  {
    title: 'Corporate Events',
    description: 'Professional catering for corporate gatherings',
    image: '/restaurante-le-chandelier-2.webp',
    order: 0,
  },
  {
    title: 'Celebrations',
    description: 'Special occasions and celebrations',
    image: '/restaurante-le-chandelier-2.webp',
    order: 1,
  },
  {
    title: 'Private Parties',
    description: 'Intimate private dining experiences',
    image: '/restaurante-le-chandelier-2.webp',
    order: 2,
  },
  {
    title: 'Special Occasions',
    description: 'Make your special day unforgettable',
    image: '/restaurante-le-chandelier-2.webp',
    order: 3,
  },
];

console.log('Data migration reference - Copy this data into Sanity Studio');
console.log('Access Sanity Studio at: http://localhost:3000/studio');

