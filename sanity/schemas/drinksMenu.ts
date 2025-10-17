import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'drinksMenu',
  title: 'Drinks Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Drinks Menu',
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
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subcategories',
              title: 'Subcategories',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subcategory',
                  title: 'Subcategory',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Subcategory Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'items',
                      title: 'Items',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          type: 'object',
                          name: 'item',
                          title: 'Item',
                          fields: [
                            defineField({
                              name: 'name',
                              title: 'Item Name',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            }),
                            defineField({
                              name: 'price',
                              title: 'Price',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'name',
                              subtitle: 'price',
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
            select: {
              title: 'name',
              subCount: 'subcategories.length',
            },
            prepare({ title, subCount }) {
              return {
                title,
                subtitle: `${subCount || 0} subcategories`,
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
        title: 'Drinks Menu',
      };
    },
  },
});

