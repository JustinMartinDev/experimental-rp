import { Prisma } from '@lib/database'

// 1: Define a type that includes the relation to `Post`
const inventoryWithItems = Prisma.validator<Prisma.InventoryDefaultArgs>()({
  include: { items: true },
})

export type InventoryWithItems = Prisma.InventoryGetPayload<typeof inventoryWithItems>

