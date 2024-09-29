import { init } from "./init";
import { onClientEvent } from "@lib/event/server"
import { prisma } from "@lib/database";

on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("Typescript/Nui/React server-side boilerplate started!");
  }
});


onClientEvent("inventory:get-my-inventory", async ({source}: {source: number}) => { 
  const steamId = GetPlayerIdentifier(`${source}`, 0);

  const inventory = await prisma.inventory.findFirst({
    where: {
      player: {
        steamId
      },
    },
    include: {
      player: false,      // Include the player details
      items: {
        include: {
          item: true,      // Include the item details
        }
      }
    },
  });
  
  return inventory;
});

onClientEvent("inventory:get-item", async ({source, itemId}: {source: number, itemId: string}) => { 
  const item = await prisma.item.findUnique({
    where: {
      id: itemId
    },
  });

  return item;
});