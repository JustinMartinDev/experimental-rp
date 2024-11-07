import { prisma } from "@lib/database";
import { GetCharacterInventoryParam, GetCharacterInventoryReturn} from "@xp-inventory/types/server/client-events/get-character-inventory";

export const getCharacterInventory = async ({ characterId }: GetCharacterInventoryParam) => {
  const inventory = await prisma.inventory.findFirst({
    where: {
      characterId,
    },
    include: {
      items: {
        include: {
          item: true, // Include the item details
        },
      },
    },
  });

  return { inventory } as GetCharacterInventoryReturn;
};

export const config = {
  name: "get-character-inventory",
  fn: getCharacterInventory,
};
