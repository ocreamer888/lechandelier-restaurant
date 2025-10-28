import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'foodMenu',
  title: 'Food Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Food Menu',
      hidden: true,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'category',
          title: 'Category',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name (English)',
              type: 'string',
              options: {
                list: [
                  { title: 'Appetizers', value: 'Appetizers' },
                  { title: 'Pasta', value: 'Pasta' },
                  { title: 'Pizza', value: 'Pizza' },
                  { title: 'Salads', value: 'Salads' },
                  { title: 'Soups', value: 'Soups' },
                  { title: 'Desserts', value: 'Desserts' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'nameSpanish',
              title: 'Category Name (Spanish)',
              type: 'string',
              options: {
                list: [
                  { title: 'Entradas', value: 'Entradas' },
                  { title: 'Pastas', value: 'Pastas' },
                  { title: 'Pizzas', value: 'Pizzas' },
                  { title: 'Ensaladas', value: 'Ensaladas' },
                  { title: 'Sopas', value: 'Sopas' },
                  { title: 'Postres', value: 'Postres' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Menu Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'menuItem',
                  title: 'Menu Item',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Item Name (English)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'nameSpanish',
                      title: 'Item Name (Spanish)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description (English)',
                      type: 'text',
                      rows: 3,
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'descriptionSpanish',
                      title: 'Description (Spanish)',
                      type: 'text',
                      rows: 3,
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'price',
                      title: 'Price',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    }),
                    defineField({
                      name: 'tags',
                      title: 'Tags',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          type: 'string',
                        }),
                      ],
                      options: {
                        list: [
                          { title: 'Vegan', value: 'Vegan' },
                          { title: 'Vegetarian', value: 'Vegetarian' },
                          { title: 'Spicy', value: 'Spicy' },
                          { title: 'Gluten-Free', value: 'Gluten‑Free' },
                          { title: 'Vegano', value: 'Vegano' },
                          { title: 'Vegetariano', value: 'Vegetariano' },
                          { title: 'Picante', value: 'Picante' },
                          { title: 'Sin Gluten', value: 'Sin Gluten' },
                        ],
                      },
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'price',
                      description: 'description',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              itemCount: 'items.length',
            },
            prepare({ title, itemCount }) {
              return {
                title,
                subtitle: `${itemCount || 0} items`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Food Menu',
      };
    },
  },
});

