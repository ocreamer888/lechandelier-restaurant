import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { apiVersion, dataset, projectId } from './env';

export default defineConfig({
  name: 'default',
  title: 'Le Chandelier CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Drinks Menu')
              .child(
                S.document()
                  .schemaType('drinksMenu')
                  .documentId('drinksMenu')
              ),
            S.listItem()
              .title('Food Menu')
              .child(
                S.document()
                  .schemaType('foodMenu')
                  .documentId('foodMenu')
              ),
            S.divider(),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('event').title('Events'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});

