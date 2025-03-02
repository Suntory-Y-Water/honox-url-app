import type {} from 'hono';

declare module 'hono' {
  interface Env {
    // Variables: {};
    Bindings: {
      URL_STORE: KVNamespace;
    };
  }
}
