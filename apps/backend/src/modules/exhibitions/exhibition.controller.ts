import type { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/arktype';
import type { Bindings } from '../..';
import { getExhibitionsResponse } from './dto/exhibition.dto';
import { exhibitionService } from './exhibition.service';

export const exhibitionsController = (app: Hono<{ Bindings: Bindings }>) => {
  app.get(
    '/exhibitions',
    describeRoute({
      responses: { 200: { content: { 'text/plain': { schema: resolver(getExhibitionsResponse) } } } },
    }),
    async (c) => {
      const exhibitions = await exhibitionService.getExhibitions();
      return c.json({ exhibitions });
    },
  );
};
