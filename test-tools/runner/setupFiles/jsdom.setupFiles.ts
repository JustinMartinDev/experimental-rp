/**
 * JSDOM is missing some important DOM APIs, so we need to mock them.
 */

import "./basic.setupFiles";

import { beforeEach } from "vitest";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
