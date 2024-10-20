import { InventoryWithItems } from "@inventory/types/prisma";

export const inventoryWithItems: InventoryWithItems = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  playerId: 1,
  items: [
    {
      inventoryId: 1,
      itemId: "pizza",
      quantity: 1,
      item: {
        id: "pizza",
        name: "Pizza",
        actionId: "update-satiety",
        actionParam: "{satiety: 30}",
      },
    },
    {
      inventoryId: 1,
      itemId: "water",
      quantity: 2,
      item: {
        id: "water",
        name: "Water bottle",
        actionId: "update-hydration",
        actionParam: "{hydration: 10}",
      },
    },
  ],
};
