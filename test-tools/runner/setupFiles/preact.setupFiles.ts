import "./jsdom.setupFiles";
import "@test-tools/msw/vitest.setupFiles";

import { afterEach } from "vitest";

const { cleanup } = (await import(
  `${process.cwd()}/node_modules/@testing-library/preact/dist/esm/index.mjs`
)) as typeof import("@testing-library/preact");

afterEach(() => {
  cleanup();
});
