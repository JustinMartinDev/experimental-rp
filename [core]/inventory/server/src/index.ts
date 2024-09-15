import { init } from "./init";
import { onClientEvent } from "@lib/event/server"
import { prisma } from "@lib/database";

on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("Typescript/Nui/React server-side boilerplate started!");
  }
});


onClientEvent("inventory:get-me", async ({source}: {source: number}) => { 
  const steamId = GetPlayerIdentifier(`${source}`, 0);

  const inventory = await prisma.inventory.findFirst({
    where: {
      player: {
        steamId
      },
    },
    include: {
      player: false,      // Include the player details
      items: true,       // Include the items in the inventory
    },
  })
  
  return inventory;
});