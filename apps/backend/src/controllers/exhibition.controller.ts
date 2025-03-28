import type { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/arktype';
import type { Bindings } from '../..';
import { exhibitionService } from '../services/exhibition.service';
import { getExhibitionResponse, getExhibitionsResponse } from './dto/exhibition.dto';

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

  app.get(
    '/exhibitions/:id',
    describeRoute({
      responses: { 200: { content: { 'text/plain': { schema: resolver(getExhibitionResponse) } } } },
    }),
    async (c) => {
      const { id } = c.req.param();

      const exhibition = await exhibitionService.getExhibition(Number(id));
      return c.json({ exhibition });
    },
  );
};
