import { createRequestHandler } from 'react-router';
import type { ServerBuild } from 'react-router';
import backendBuild from '../apps/backend/dist/index.js';
import * as frontendBuild from '../apps/frontend/build/server';

export type Bindings = {
  HARVARD_API_KEY: string;
  UNSPLASH_ACCESS_KEY: string;
};

export function getLoadContext({ context }) {
  return context;
}

const requestHandler = createRequestHandler(frontendBuild as unknown as ServerBuild);

export default {
  async fetch(request: Request, env: Bindings, ctx) {
    const loadContext = getLoadContext({
      request,
      context: {
        cloudflare: {
          // @ts-ignore
          cf: request.cf,
          ctx: {
            waitUntil: ctx.waitUntil.bind(ctx),
            passThroughOnException: ctx.passThroughOnException.bind(ctx),
          },
          caches,
          env,
        },
      },
    });

    if (request.url.includes('/api/')) {
      return backendBuild.fetch(request, env, ctx);
    }

    return await requestHandler(request, loadContext);
  },

  async scheduled(controller, env, ctx) {
    return backendBuild.scheduled(controller, env, ctx);
  },
};
