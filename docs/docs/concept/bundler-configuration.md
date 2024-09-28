# Bundler configuration

## Rollup :

I use Rollup, a javascript bundler to convert my `.ts` sources files to single bundled file `.index.js`. The bundler will firstly compile the `.ts` files. After as FiveM only allows `require` of native node.js package like `path`, `fs`, … rollup will copy above the code the required method loaded using `import`.

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

`package.json` :

```json
{
  ...
  "devDependencies": {
    "@citizenfx/client": "2.0.9282-1",
    "@rollup/plugin-commonjs": "^26.0.1",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.6",
    "@types/node": "^20.14.12",
    "rollup": "^4.20.0",
    "tslib": "^2.6.3",
    "typescript": "^5.5.4"
  },
  ...
}
```

## TypeScript :

For typing our code, we will use two packages provided by [CFX.re](http://CFX.re) the company behind FiveM

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

`init.ts`

```tsx
import { join } from "path";

export const init = () => {
  console.log("inited", join(".", "init.js"));
};
```

`index.ts`

```tsx
import { init } from "./init";

on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    init();
  }
});
```

After running `rollup -c`, you will have only one file :

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
