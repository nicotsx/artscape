import { apiReference } from '@scalar/hono-api-reference';
import { openAPISpecs } from 'hono-openapi';
import type { HonoApp } from '..';

export const docsController = (app: HonoApp) => {
  app.get(
    '/openapi.json',
    openAPISpecs(app, {
      documentation: {
        info: { title: 'Artscape API', version: '1.0.0', description: 'API for Artscape' },
        servers: [
          { url: 'https://artscape.4each.org', description: 'Production Server' },
          { url: 'http://localhost:8080', description: 'Development Server' },
        ],
      },
    }),
  );
  app.get(
    '/docs',
    apiReference({
      title: 'Artscape API Docs',
      pageTitle: 'Artscape API Docs',
      url: '/api/openapi.json',
    }),
  );
};
