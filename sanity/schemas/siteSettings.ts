import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Le Chandelier',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'hours',
          title: 'Day Hours',
          fields: [
            defineField({
              name: 'day',
              title: 'Day (English)',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'daySpanish',
              title: 'Day (Spanish)',
              type: 'string',
              options: {
                list: [
                  'Lunes',
                  'Martes',
                  'Miércoles',
                  'Jueves',
                  'Viernes',
                  'Sábado',
                  'Domingo',
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'e.g., "18:00 - 22:30" or "Closed"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              day: 'day',
              time: 'time',
            },
            prepare({ day, time }) {
              return {
                title: day,
                subtitle: time,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'hoursText',
      title: 'Hours Text (Footer) - English',
      type: 'string',
      description: 'Short text for footer, e.g., "Open Mon–Sat · 6:30pm–11pm"',
      initialValue: 'Open Mon–Sat · 6:30pm–11pm',
    }),
    defineField({
      name: 'hoursTextSpanish',
      title: 'Hours Text (Footer) - Spanish',
      type: 'string',
      description: 'Short text for footer, e.g., "Abierto Lun–Sáb · 6:30pm–11pm"',
      initialValue: 'Abierto Lun–Sáb · 6:30pm–11pm',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
          initialValue: 'Los Yoses, San Jose, Costa Rica',
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          initialValue: '+506 7130 0911',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          initialValue: 'hello@lechandelier.restaurant',
        }),
        defineField({
          name: 'mapsLink',
          title: 'Google Maps Link',
          type: 'url',
          initialValue: 'https://www.google.com/maps/place/Le+Chandelier/@9.9293391,-84.0589315,17z',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          initialValue: 'https://facebook.com/lechandeliercr',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          initialValue: 'https://instagram.com/lechandeliercr',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
          initialValue: 'https://twitter.com/lechandeliercr',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});

