import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bundler configuration

<ThemedImage
alt="Bundler schema"
sources={{
    light: useBaseUrl('/docs/bundler-top-level-light.svg'),
    dark: useBaseUrl('/docs/bundler-top-level-dark.svg'),
  }}
style={{marginBottom: "3vh"}}
/>

The JavaScript bundler convert `.ts` sources files to single bundled file `index.js`. To do it, I use [Rollup](https://rollupjs.org/introduction/) a bundler for NodeJS.

It's probably possible to use [Vite](https://vite.dev/) or [Webpack](https://webpack.js.org/) but they are more oriented to build Web project.

## Configuration

To use `rollup` we will manage a configuration inside `rollup.config.mjs`, this configuration will manage 3 things:

- Compile the TypeScript files into JavaScript
- Resolve all dependencies from `node_modules` folder and project itself
- Convert the bundled code into CommonJS

`rollup.config.mjs`

```jsx
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
  },
  plugins: [resolve(), typescript(), commonjs()],
};
```

## TypeScript

For typing our code, we will use two packages provided by [CFX.re](http://CFX.re)

- `@citizenfx/client`
- `@citizenfx/server`

These packages provided types for each [native method](https://docs.fivem.net/natives/) usable inside client-side or server-side code.

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    // Location
    "outDir": "./dist",
    // Other
    "types": ["@citizenfx/client", "@types/node"],
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["**/node_modules", "**/.test.ts"]
}
```

## Exemple

<Tabs>
  <TabItem value="init.ts" label="init.ts">
    ```tsx
      import { join } from "path";

      export const init = () => {
        console.log("inited", join(".", "init.js"));
      };
    ```

  </TabItem>
  
  <TabItem value="index.ts" label="index.ts">
    ```tsx
      import { init } from "./init";

      on("onResourceStart", async (resName: string) => {
        if (resName === GetCurrentResourceName()) {
          init();
        }
      });
    ```

  </TabItem>

  <TabItem value="bundle.js" label="bundle.js">
    ```jsx
    "use strict";

    var path = require("path");

    const init = () => {
      console.log("inited", path.join(".", "init.js"));
    };

    on("onResourceStart", async (resName) => {
      if (resName === GetCurrentResourceName()) {
        init();
      }
    });
    ```

  </TabItem>
</Tabs>
