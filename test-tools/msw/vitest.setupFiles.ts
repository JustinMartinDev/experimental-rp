import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "./server";

// Mock Service Worker setup
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
