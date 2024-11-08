import { Prisma } from "@lib/database";

// 1: Define a type that includes the relation to `Post`
const inventoryWithItems = Prisma.validator<Prisma.InventoryDefaultArgs>()({
  include: { items: { include: { item: true } } },
});

export type InventoryWithItems = Prisma.InventoryGetPayload<
  typeof inventoryWithItems
>;

const item = Prisma.validator<Prisma.ItemDefaultArgs>()({});

export type Item = Prisma.ItemGetPayload<typeof item>;
