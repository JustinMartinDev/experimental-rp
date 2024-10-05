### Database

When you develop a FiveM server, it’s classic to use a database to store player data, and all other persistent information.

To use database in server-side code, FiveM community created multiple connectors :

- **fivem-async-mysql**
- **oxmysql**
- …

All of these connectors provide methods to execute raw queries like :

```tsx
const response = await MySQL.query(
  "SELECT `firstname`, `lastname` FROM `users` WHERE `identifier` = ?",
  [identifier]
);
```

There are 2 main problems with this way of interacting with the database :

- Dev has to parse the response to type it with a good model
- Query are not validated in face of database schema before execution

These pain points are resolved using ORM, they allow you to describe your models, it will manage type checking. In this article, we will see how to integrate [Prisma ORM](https://www.prisma.io/orm) inside FiveM.

The FiveM resource folder I will use in my article is a [pnpm](https://pnpm.io/) workspace. It allows managing multiple packages with shared code.

```tsx
├── player-manager
│   └── prisma
│		│   ├── player.schema.prisma
│   │   └── package.json // @player-manager/prisma package
│		└── server
│		│   ├── server.ts
│   │   └── package.json // @player-manager/server package
│   └── fxmanifest.lua
├── lib
│   └── prisma-orm.  // @lib/prisma-orm package
│			 ├── package.json
│			 └── ...
├── package.json
└── pnpm-worspace.yml

```

## Split prisma schema

In `prisma-orm` folder setup Prisma following the [Getting started](https://www.prisma.io/docs/getting-started/quickstart). Firstly, we will change to split the Prisma schema into multiple source.

To do this, we will use the [merge-prisma-schema](https://www.npmjs.com/package/merge-prisma-schema) tool. It will be used to merge schema fragments spread into multiples modules

`merge-prisma-schema.config.ts`

```tsx
const config = {
  schemas: ["header.prisma", "@player-manager/prisma/player.schema.prisma"],
  output: "prisma/schema.prisma",
  schemaSearchFolders: ["node_modules", "prisma"],
  prismaCli: "npx prisma",
};

export default config;
```

`header.prisma`

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider      = "prisma-client-js"
  engineType    = "binary"
  binaryTargets = ["windows"]
  output        = "C:/gta-fivem/txData/CFXDefaultFiveM_8AE314.base/resources/lib/prisma-orm/prisma/generated"
}

datasource db {
  provider = "sqlite"
  url      = "file:C:/gta-fivem/txData/CFXDefaultFiveM_8AE314.base/resources/dev.db"
}

```

inside `@player-module` the file `player.schema.prisma`

```
model Player {
  id          Int      @id @default(autoincrement())
  steamId     String   @unique
  lastname    String
  firstname   String
  inventory   Inventory?
}
```

Update `prisma-orm` module `package.json`

```json
{
  "name": "@lib/database",
  "version": "1.0.0",
  "scripts": {
    "--------- BUILD ---------": "--------- BUILD ---------",
    "pregenerate": "npx merge-prisma-schema && rm -rf ./prisma/generated",
    "generate": "prisma generate",
    "--------- MIGRATE ---------": "--------- MIGRATE ---------",
    "premigrate": "npx merge-prisma-schema",
    "migrate": "prisma migrate"
  },
  "devDependencies": {
    "@player-manager/prisma": "workspace:*",
    "merge-prisma-schema": "^1.0.0",
    "prisma": "catalog:",
    "ts-node": "catalog:",
    "typescript": "catalog:"
  },
  "dependencies": {
    "@prisma/client": "catalog:"
  }
}
```

If you run `npx pregenerate` it update the `prisma.schema` file like this :

```
// Generated at 2024-09-07T20:46:01.740Z by "merge-prisma-schema"

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider      = "prisma-client-js"
  engineType    = "binary"
  binaryTargets = ["windows"]
  output        = "C:/gta-fivem/txData/CFXDefaultFiveM_8AE314.base/resources/lib/database/prisma/generated"
}

datasource db {
  provider = "sqlite"
  url      = "file:C:/gta-fivem/txData/CFXDefaultFiveM_8AE314.base/resources/dev.db"
}

model Player {
  id          Int      @id @default(autoincrement())
  steamId     String   @unique
  lastname    String
  firstname   String
  inventory   Inventory?
}
```

## Generate prisma runtime

We will use `npx generate` to create the Prisma runtime, as [the documentation](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) explains. After generating, we will use a script to modify the file `index.js` which has been generated. To do it will use the package `tsx`.

`package.json`

```tsx
{
  "name": "@lib/prisma-orm",
  "version": "1.0.0",
  "scripts": {
    "--------- BUILD ---------": "--------- BUILD ---------",
    "pregenerate": "npx merge-prisma-schema && rm -rf ./prisma/generated",
    "generate": "prisma generate",
    "postgenerate": "npx tsx patch-generated-runtime.ts",
    "--------- MIGRATE ---------": "--------- MIGRATE ---------",
    "premigrate": "npx merge-prisma-schema",
    "migrate": "prisma migrate"
  },
  "devDependencies": {
    "@player-manager/prisma": "workspace:*",
    "merge-prisma-schema": "^1.0.0",
    "prisma": "catalog:",
    "ts-node": "catalog:",
    "typescript": "catalog:",
  },
  "dependencies": {
    "@prisma/client": "catalog:"
  }
}
```

`patch-generated-runtime.ts`

```tsx
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const toReplace = `
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
`;

const replaceValue = `
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }); 

  if(alternativePath) {
    config.dirname = path.join(process.cwd(), alternativePath)
  } else if(config?.generator?.output?.value) {
    config.dirname = config.generator.output.value;
  } else {
    config.dirname = path.join(process.cwd(), alternativePaths[0]);
  }

  config.isBundled = true  
`;

const file = join(process.cwd(), "prisma", "generated", "index.js");

const indexContent = readFileSync(file, { encoding: "utf-8" });

const newIndexContent = indexContent.replace(toReplace, replaceValue);

writeFileSync(file, newIndexContent);
```

With the patch, Prisma directory will be defined with the `output` property set in `schema.prisma`

## Bundle prisma client

As FiveM works only with `commonjs` bundled files, we will use `rollup` to create a compatible built code. This code will be shared with other packages/resources.

`rollup.config.mjs`

```jsx
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const banner = `
  const { resolve, join } = require("path");
  const { cwd } = require("process");

  var __dirname = resolve();
  var __filename = join(__dirname, "index.js");

  process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "lib", "prisma-orm", "prisma", "generated", "query-engine-windows.exe");
`;

export default {
  input: "./index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
    banner,
  },
  plugins: [resolve(), typescript(), commonjs()],
};
```

With this config, we create a bundle and prefix it with some critical information :

- `__dirname` and `__filename` do not exist in FiveM node execution context, so we define it manually because it’s needed by Prisma.
- `process.env["PRISMA_QUERY_ENGINE_BINARY"]` is the location of query engine executable generated inside Prisma runtime folder

## Example of use

Inside `@player-manager/server` which is a Typescript package with rollup config explained [here](https://dev.to/justinmartindev/fivem-x-typescript-3pgd), I add `@lib/prisma-orm` to the `dependencies`.

`server.ts`

```tsx
import { prisma } from "@lib/database";

on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    const players = await prisma.player.findMany();
    console.log("players", JSON.stringify(players));
  }
});
```

You can retrieve a full example here https://github.com/JustinMartinDev/experimental-rp
