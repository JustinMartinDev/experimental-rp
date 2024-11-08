import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Database

<ThemedImage
alt="Database schema"
sources={{
    light: useBaseUrl('/docs/database-light.svg'),
    dark: useBaseUrl('/docs/database-dark.svg'),
  }}
style={{marginBottom: "3vh"}}
/>

To create a complete FiveM server, particularly for RP, you need to use a database to store all the persistent information

## Problem

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

- As we are in TypeScript environment, devs has to parse the response to type it with a good model
- Query are not validated in face of database schema before execution, it can break at runtime when changed are made on model

## ORM the solution

These pain points are resolved using ORM :

- They allow you to describe your models, it will manage type checking.
- The main ORM provide a migration tool for database schema

I choose to use [Prisma ORM](https://www.prisma.io/orm) but you can probably use others ORM like `TypeORM`, `Sequelize`, ...

## Split prisma schema

As I use [pnpm](https://pnpm.io/) to manage multiple workspace in project, I use all of the power provided by the tool to manage the database schema inside multiple packages.

```tsx
├── player
│   └── prisma
│   │   ├── player.schema.prisma
│   │   └── package.json // @xp-player/prisma package
│   │   ...
│   └── fxmanifest.lua
├── inventory
│   └── prisma
│   │   ├── inventory.schema.prisma
│   │   └── package.json // @xp-inventory/prisma package
│   │   ...
│   └── fxmanifest.lua
├── lib
│   └── database
│   │   └── prisma
│   │   │   ├── header.prisma
│   │   │   └── schema.prisma
│   │   └── package.json // @lib/database package
│   │   ...
└── pnpm-worspace.yml
```

In `lib/database` folder, I configured Prisma following the [Getting started](https://www.prisma.io/docs/getting-started/quickstart).

I use the package[merge-prisma-schema](https://www.npmjs.com/package/merge-prisma-schema) to merge all schema fragments into `lib/database/prisma/schema.prisma`. The file `lib/database/prisma/header.prisma` allow me to describe core information for Prisma.

<Tabs>
  <TabItem value="merge-prisma-schema.config.ts" label="merge-prisma-schema.config.ts">
    ```ts
    const config = {
      schemas: ["header.prisma", "@xp-player/prisma/player.schema.prisma", "@xp-inventory/prisma/inventory.schema.prisma"],
      output: "prisma/schema.prisma",
      schemaSearchFolders: ["node_modules", "prisma"],
      prismaCli: "npx prisma",
    };

    export default config;
    ```

  </TabItem>
  
  <TabItem value="header.prisma" label="header.prisma">
    ```
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
    ```

  </TabItem>

  <TabItem value="player.schema.prisma" label="player.schema.prisma">
    ```
    model Player {
      id          Int      @id @default(autoincrement())
      steamId     String   @unique
      lastname    String
      firstname   String
      inventory   Inventory?
    }
    ```

  </TabItem>

  <TabItem value="inventory.schema.prisma" label="inventory.schema.prisma">
    ```
    model Inventory {
      id        Int      @id @default(autoincrement())
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt

      items ItemInInventory[]

      player    Player   @relation(fields: [playerId], references: [id])
      playerId  Int      @unique // relation scalar field (used in the `@relation` attribute above)
    }

    model Item {
      id            String    @id
      name          String    // Name of the item

      actionId      String    // Id of action
      actionParam   String    // Params of action

      inventories ItemInInventory[]
    }

    model ItemInInventory {
      item          Item        @relation(fields: [itemId], references: [id])
      itemId        String

      inventory     Inventory   @relation(fields: [inventoryId], references: [id])
      inventoryId   Int

      quantity      Int      @default(1)

      @@id([itemId, inventoryId])
    }
    ```

  </TabItem>
</Tabs>

After running `npx npx merge-prisma-schema` it update the `prisma.schema` file like this :

```
// Generated at 2024-10-01T20:44:41.858Z by "merge-prisma-schema"

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
  id        Int        @id @default(autoincrement())
  steamId   String     @unique
  lastname  String
  firstname String
  inventory Inventory?
}

model Inventory {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  items ItemInInventory[]

  player   Player @relation(fields: [playerId], references: [id])
  playerId Int    @unique // relation scalar field (used in the `@relation` attribute above)
}

model Item {
  id   String @id
  name String // Name of the item

  actionId    String // Id of action
  actionParam String // Params of action

  inventories ItemInInventory[]
}

model ItemInInventory {
  item   Item   @relation(fields: [itemId], references: [id])
  itemId String

  inventory   Inventory @relation(fields: [inventoryId], references: [id])
  inventoryId Int

  quantity Int @default(1)

  @@id([itemId, inventoryId])
}
```

## Patch prisma runtime

Prisma create a batch of JavaScript files using `npx prisma generate` command as [the documentation](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) explains. But the `index.js` generated file can not work in my project context. Indeed the file contains code to detect the location of prisma folder, I patched it using [`tsx`](https://www.npmjs.com/package/tsx) and a TypeScript file `post-generated.ts`.

```ts
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const toReplaceRegex = /const alternativePath =(.|\n)+config.isBundled = true/g;

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

const newIndexContent = indexContent.replace(toReplaceRegex, replaceValue);

writeFileSync(file, newIndexContent);
```

With the patch, Prisma directory will be defined with the `output` property set in `schema.prisma`

## Bundle prisma client

Like the other package we need to bundlise it. But as we are in FiveM context we will have tto define some constant and an env variable.

- `__dirname` and `__filename` do not exist in FiveM execution context, so we define it manually because it’s needed by Prisma.
- `process.env["PRISMA_QUERY_ENGINE_BINARY"]` is the location of query engine executable generated inside Prisma runtime folder

To manage it we will use the `rollup` props `banner` to inject a batch of code at top of bundled file.

`rollup.config.mjs`

```js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const banner = `
  const { resolve, join } = require("path");
  const { cwd } = require("process");

  var __dirname = resolve();
  var __filename = join(__dirname, "index.js");

  process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "lib", "database", "prisma", "generated", "query-engine-windows.exe");
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

## Example of use

Inside `@xp-player/server` which is a Typescript package with rollup config explained [here](https://justinmartindev.github.io/experimental-rp/docs/conception/bundler-configuration), I add `@lib/database` to the `dependencies`.

`server.ts`

```ts
import { prisma } from "@lib/database";

on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    const players = await prisma.player.findMany();
    console.log("players", JSON.stringify(players));
  }
});
```
