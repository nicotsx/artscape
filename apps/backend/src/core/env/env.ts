import { type } from 'arktype';
import { drizzle } from 'drizzle-orm/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

import type { Bindings } from '../..';
import * as schema from '../db/schema';

const envSchema = type({
  HARVARD_API_KEY: 'string',
});

let env: typeof envSchema.infer;
let db: DrizzleD1Database<typeof schema>;
let kv: KVNamespace;

export function initializeEnv(bindings: Bindings) {
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
}

export { env, db, kv };
