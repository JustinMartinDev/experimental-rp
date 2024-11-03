import { onClientEvent } from "@lib/citizenfx-utils/event/server";
import { prisma } from "@lib/database";

export const init = () => {
  onClientEvent(
    "inventory:get-item",
    async ({ source, itemId }: { source: number; itemId: string }) => {
      const item = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });

      return item;
    }
  );
};
