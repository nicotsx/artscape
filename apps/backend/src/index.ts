import { type Env, Hono } from 'hono';
import { cors } from 'hono/cors';
import { docsController } from './controllers/docs.controller';
import { initializeEnv } from './core/env/env';
import { exhibitionsController } from './modules/exhibitions/exhibition.controller';
import { exhibitionService } from './modules/exhibitions/exhibition.service';

export type Bindings = {
  HARVARD_API_KEY: string;
  DB: D1Database;
  KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');
export type HonoApp = typeof app;

app.use(cors());

docsController(app);
exhibitionsController(app);

export default {
  async fetch(request: Request, env: Env & Bindings, ctx: ExecutionContext) {
    initializeEnv(env);

    return app.fetch(request, env, ctx);
  },
  async scheduled(_: ScheduledController, env: Env & Bindings, ctx: ExecutionContext): Promise<void> {
    initializeEnv(env);

    ctx.waitUntil(exhibitionService.fetchExhibitions());
  },
};
