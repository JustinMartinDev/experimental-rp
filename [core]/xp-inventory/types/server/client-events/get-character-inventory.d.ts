import { InventoryWithItems } from "../../prisma";

export type GetCharacterInventoryParam = {
  characterId: number;
};

export type GetCharacterInventoryReturn = {
  inventory: InventoryWithItems;
};
