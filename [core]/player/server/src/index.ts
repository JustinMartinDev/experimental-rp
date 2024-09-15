import { prisma } from "@lib/database"
import { onClientEvent } from "@lib/event/server"

onClientEvent("player:get-players", async ({source}: {source: number}) => { 
  const players = await prisma.player.findMany();
  return players;
});

onClientEvent("player:get-me", async ({source}: {source: number}) => { 
  const steamId = GetPlayerIdentifier(`${source}`, 0);

  const player = await prisma.player.findUnique({
    where: {
      steamId
    }
  });
  
  return player;
});