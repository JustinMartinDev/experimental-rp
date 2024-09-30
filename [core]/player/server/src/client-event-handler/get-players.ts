import { onClientEvent } from "@lib/event/server";
import { prisma } from "@lib/database";

export const init = () => {
  onClientEvent(
    "player:get-players",
    async ({ source }: { source: number }) => {
      const players = await prisma.player.findMany();
      return players;
    }
  );
};
