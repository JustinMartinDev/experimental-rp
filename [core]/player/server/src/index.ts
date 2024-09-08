import { prisma } from "@lib/database"
import { onClientEvent } from "@lib/event/server"

/*
on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    init();
    const players = await prisma.player.findMany();
    console.log("players", JSON.stringify(players))
  }
});
*/

onClientEvent("player:get-players", async () => { 
  const players = await prisma.player.findMany();

  return players;
});