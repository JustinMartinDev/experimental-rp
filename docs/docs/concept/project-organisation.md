# Project organisation

I use pnpm to manage sub-module inside the project.

About folder orgisation, we have

`lib/*` packages contain shared methods around other package to improve DX.

| Folder glob         | Description                                        |
| ------------------- | -------------------------------------------------- |
| `lib/database`      | ORM schema and connection entry to database        |
| `lib/react-menu-ui` | Menu react components to use inside NUI frame      |
| `lib/event`         | Shared method to improve event managment, listener |

`**/client` packages contain FiveM **client-side** resources with types and bundeling configuration.

`**/server` packages contain FiveM **server-side** resources with types and bundeling configuration.

`**/prisma` packages contain database model, use to generate migration and ORM types.

`**/types` packages to share typings of resource exported methods or ORM based type. It is used inside `**/client` and `**/server` packages.

`**/web` packages contain react app of resource NUI frame.
