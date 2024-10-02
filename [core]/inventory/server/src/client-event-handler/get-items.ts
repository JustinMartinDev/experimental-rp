import { onClientEvent } from "@lib/event/server";
import { prisma } from "@lib/database";

export const init = () => {
  onClientEvent(
    "inventory:get-items",
    async ({ source, itemIds }: { source: number; itemIds: string[] }) => {
      const item = await prisma.item.findMany({
        where: {
          id: itemIds,
        },
      });

      return item;
    }
  );
};
