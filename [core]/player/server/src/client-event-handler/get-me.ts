import { onClientEvent } from "@lib/citizenfx-utils/event/server";
import { prisma } from "@lib/database";

export const init = () => {
  onClientEvent("player:get-me", async ({ source }: { source: number }) => {
    const steamId = GetPlayerIdentifier(`${source}`, 0);

    const player = await prisma.player.findUnique({
      where: {
        steamId,
      },
    });

    return player;
  });
};
