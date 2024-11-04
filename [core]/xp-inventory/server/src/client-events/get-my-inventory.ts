import { prisma } from "@lib/database";

type GetMyInventoryParams = {
  source: number;
};

export const getMyInventory = async ({ source }: GetMyInventoryParams) => {
  const steamId = GetPlayerIdentifier(`${source}`, 0);

  const inventory = await prisma.inventory.findFirst({
    where: {
      player: {
        steamId,
      },
    },
    include: {
      player: false, // Include the player details
      items: {
        include: {
          item: true, // Include the item details
        },
      },
    },
  });

  return inventory;
};

export const config = {
  name: "get-my-inventory",
  fn: getMyInventory,
};
