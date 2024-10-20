import { mergeConfig, ViteUserConfig } from "vitest/config";

/*
 * Factorizes the configuration for the test runner.
 *
 * You need to import this file in your `vitest.config.ts` using a relative path,
 * example: `import { extendRootConfig } from '../test-runner/vitest.config'`.
 * Using an absolute path (`'test-runner/vitest.config'`) won't work.
 */

const rootConfig: ViteUserConfig = {
  plugins: [],
  test: {
    environment: "node",

    logHeapUsage: false,

    // By default Vitest allows for __tests__/*.js, *.spec.js and *.test.js
    // Let's be strict and use *.test.js only
    include: ["**/*.test.?(c|m)[jt]s?(x)"],

    // https://github.com/jestjs/jest/issues/4386#issuecomment-586028628
    sequence: { shuffle: true },

    poolOptions: {
      threads: {
        // FIXME https://github.com/vitest-dev/vitest/issues/2008#issuecomment-1257183963
        singleThread: true,
      },
    },

    // https://github.com/vitest-dev/vitest/issues/4457
    passWithNoTests: true,

    coverage: {
      enabled: false,
    },

    // Vitest already calls .restoreAllMocks() for each test **file**:
    // https://github.com/vitest-dev/vitest/blob/v0.34.7/packages/vitest/src/runtime/entry.ts#L51
    // What about each test inside a single file? Vitest/Jest does nothing
    //
    // https://vitest.dev/config/#restoremocks
    // > Will call .mockRestore() on all spies before each test
    //
    // FYI mockRestore() > mockReset() > mockClear()
    //
    // FIXME https://github.com/jestjs/jest/issues/10419#issuecomment-731176514
    // https://github.com/vitest-dev/vitest/issues/3503
    //
    // https://github.com/jestjs/jest/issues/9047
    // https://github.com/jestjs/jest/issues/9047#issuecomment-1058375805
    //clearMocks: true,
    //mockReset: true,
    restoreMocks: true,
  },
};

export function extendRootConfig(config: ViteUserConfig) {
  return mergeConfig(rootConfig, config);
}
