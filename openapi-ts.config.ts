import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:8080/api/openapi.json',
  output: {
    path: './apps/frontend/app/api-client',
    format: 'biome',
  },
  plugins: [...defaultPlugins, '@hey-api/client-fetch'],
});
