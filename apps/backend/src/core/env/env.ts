import { type } from 'arktype';
import { drizzle } from 'drizzle-orm/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

import type { Bindings } from '../..';
import { exhibitionService } from '../../services/exhibition.service';
import * as schema from '../db/schema';

const envSchema = type({
  HARVARD_API_KEY: 'string?',
  UNSPLASH_ACCESS_KEY: 'string?',
});

let env: typeof envSchema.infer;
let db: DrizzleD1Database<typeof schema>;
let kv: KVNamespace;

export async function initializeEnv(bindings: Bindings) {
  const { DB, KV, ...environment } = bindings;
  const result = envSchema(environment);

  if (result instanceof type.errors) {
    throw result;
  }

  env = result;
  if (!db) {
    db = drizzle(DB, { schema });
  }

  if (!kv) {
    kv = KV;
  }

  const exhibitions = await db.query.exhibitionsTable.findMany();
  if (!exhibitions.length) {
    await exhibitionService.fetchExhibitions();
  }
}

export { env, db, kv };
