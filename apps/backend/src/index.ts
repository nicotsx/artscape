import { type Env, Hono } from 'hono';
import { docsController } from './controllers/docs.controller';
import { exhibitionsController } from './controllers/exhibition.controller';
import { initializeEnv } from './core/env/env';
import { exhibitionService } from './services/exhibition.service';

export type Bindings = {
  HARVARD_API_KEY: string;
  UNSPLASH_ACCESS_KEY: string;
  DB: D1Database;
  KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');
export type HonoApp = typeof app;

docsController(app);
exhibitionsController(app);

export default {
  async fetch(request: Request, env: Env & Bindings, ctx: ExecutionContext) {
    try {
      console.info('Request received', request.url);
      await initializeEnv(env);

      return app.fetch(request, env, ctx);
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
  async scheduled(cron: ScheduledController, env: Env & Bindings, ctx: ExecutionContext): Promise<void> {
    try {
      console.info('Scheduled task started', cron.cron, cron.scheduledTime);
      await initializeEnv(env);

      ctx.waitUntil(exhibitionService.fetchExhibitions());
    } catch (error) {
      console.error(error);
    }
  },
};
