import { logger } from 'hono/logger';
import { createRoute } from 'honox/factory';

export default createRoute(logger());
