import { onClientEvent } from "@lib/citizenfx-utils/event/server";
import { prisma } from "@lib/database";

export const init = () => {
  onClientEvent(
    "inventory:get-my-inventory",
    async ({ source }: { source: number }) => {
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
    }
  );
};
