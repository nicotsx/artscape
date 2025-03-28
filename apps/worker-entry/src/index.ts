import { Hono } from 'hono';
import { serveStatic } from "hono/cloudflare-workers";

import { app } from '../../backend/src/index';
